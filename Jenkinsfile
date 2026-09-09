pipeline {
    agent any

    environment {
        SONARQUBE = 'SonarQube'
        DOCKER_IMAGE = 'job-portal'
        JENKINS_VOLUME = 'jenkins_jenkins_home'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/nishikant-18/job-portal.git'
            }
        }

        stage('Gitleaks Secret Scan') {
            steps {
                sh '''
                    docker run --rm \
                      -v "$WORKSPACE:/repo" \
                      zricethezav/gitleaks:8.30.1 \
                      detect \
                      --source=/repo \
                      --no-banner \
                      --redact \
                      --exit-code 1
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    docker run --rm \
                      -v ${JENKINS_VOLUME}:/var/jenkins_home \
                      -w /var/jenkins_home/workspace/${JOB_NAME} \
                      node:22-bookworm \
                      npm ci
                '''
            }
        }

        stage('SonarQube SAST') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh '''
                        sonar-scanner \
                          -Dsonar.projectKey=job-portal \
                          -Dsonar.projectName=job-portal \
                          -Dsonar.sources=. \
                          -Dsonar.exclusions=node_modules/**,dist/**
                    '''
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Docker Build') {
            steps {
                withCredentials([file(credentialsId: 'job-portal-env', variable: 'ENV_FILE')]) {
                    sh '''
                        DOCKER_BUILDKIT=1 docker build \
                          --secret id=env,src="$ENV_FILE" \
                          -t ${DOCKER_IMAGE}:${BUILD_NUMBER} \
                          .
                    '''
                }
            }
        }

        stage('Trivy Container Scan') {
            steps {
                sh '''
                    docker run --rm \
                      -v /var/run/docker.sock:/var/run/docker.sock \
                      aquasec/trivy:latest image \
                      --severity CRITICAL \
                      --exit-code 1 \
                      ${DOCKER_IMAGE}:${BUILD_NUMBER}
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    set +e

                    echo "======================================"
                    echo "Starting deployment"
                    echo "======================================"

                    # Capture the currently running image for rollback
                    PREVIOUS_IMAGE=$(docker inspect job-portal-app \
                        --format '{{.Config.Image}}' 2>/dev/null)

                    if [ -z "$PREVIOUS_IMAGE" ]; then
                        echo "⚠️ No previous deployment found."
                        PREVIOUS_IMAGE=""
                    else
                        echo "Previous image: $PREVIOUS_IMAGE"
                    fi

                    NEW_IMAGE="${DOCKER_IMAGE}:${BUILD_NUMBER}"

                    echo "New image: $NEW_IMAGE"

                    # Remove current container
                    docker rm -f job-portal-app 2>/dev/null || true

                    # Deploy new version
                    echo "Deploying $NEW_IMAGE..."

                    docker run -d \
                        --name job-portal-app \
                        --restart unless-stopped \
                        -p 8080:80 \
                        "$NEW_IMAGE"

                    echo "Waiting for application to start..."

                    HEALTHY=false

                    for i in $(seq 1 10); do
                        if curl -fsS http://host.docker.internal:8080/ > /dev/null; then
                            echo "✅ Application is healthy!"
                            HEALTHY=true
                            break
                        fi

                        echo "Waiting... ($i/10)"
                        sleep 2
                    done

                    # New deployment succeeded
                    if [ "$HEALTHY" = true ]; then
                        echo "======================================"
                        echo "✅ Deployment successful!"
                        echo "Running image: $NEW_IMAGE"
                        echo "======================================"
                        exit 0
                    fi

                    # New deployment failed
                    echo "======================================"
                    echo "❌ New deployment failed!"
                    echo "======================================"

                    echo "Failed container logs:"
                    docker logs job-portal-app || true

                    # Cannot rollback if there was no previous deployment
                    if [ -z "$PREVIOUS_IMAGE" ]; then
                        echo "❌ No previous image available for rollback."
                        exit 1
                    fi

                    echo "======================================"
                    echo "🔄 Starting automatic rollback"
                    echo "======================================"
                    echo "Rolling back to: $PREVIOUS_IMAGE"

                    # Remove failed deployment
                    docker rm -f job-portal-app 2>/dev/null || true

                    # Restore previous version
                    docker run -d \
                        --name job-portal-app \
                        --restart unless-stopped \
                        -p 8080:80 \
                        "$PREVIOUS_IMAGE"

                    echo "Waiting for rollback version to become healthy..."

                    ROLLBACK_HEALTHY=false

                    for i in $(seq 1 10); do
                        if curl -fsS http://host.docker.internal:8080/ > /dev/null; then
                            echo "✅ Rollback successful!"
                            ROLLBACK_HEALTHY=true
                            break
                        fi

                        echo "Rollback waiting... ($i/10)"
                        sleep 2
                    done

                    if [ "$ROLLBACK_HEALTHY" = true ]; then
                        echo "======================================"
                        echo "🔄 Rollback completed successfully"
                        echo "Restored image: $PREVIOUS_IMAGE"
                        echo "======================================"
                    else
                        echo "======================================"
                        echo "❌ CRITICAL: Rollback health check failed!"
                        echo "======================================"

                        docker ps -a --filter name=job-portal-app
                        docker logs job-portal-app || true
                    fi

                    # The original deployment failed,
                    # therefore the Jenkins build must still be marked FAILED.
                    exit 1
                '''
            }
        }
    }

    post {
        success {
            echo '✅ DevSecOps Pipeline completed successfully!'
        }

        failure {
            echo '❌ Pipeline failed. Check the stage logs.'
        }
    }
}