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
                    docker rm -f job-portal-app 2>/dev/null || true

                    docker run -d \
                        --name job-portal-app \
                        --restart unless-stopped \
                        -p 8080:80 \
                        ${DOCKER_IMAGE}:${BUILD_NUMBER}

                    echo "Waiting for application to start..."

                    for i in {1..10}; do
                        if curl -fsS http://host.docker.internal:8080/ > /dev/null; then
                            echo "✅ Application is healthy!"
                            exit 0
                        fi

                        echo "Waiting... ($i/10)"
                        sleep 2
                    done

                    echo "❌ Application health check failed!"
                    docker logs job-portal-app
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