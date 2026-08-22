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

        stage('Build') {
            steps {
                sh '''
                    docker run --rm \
                      -v ${JENKINS_VOLUME}:/var/jenkins_home \
                      -w /var/jenkins_home/workspace/${JOB_NAME} \
                      node:22-bookworm \
                      npm run build
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
                sh '''
                    docker build \
                      -t ${DOCKER_IMAGE}:${BUILD_NUMBER} \
                      .
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully!'
        }

        failure {
            echo '❌ Pipeline failed. Check the stage logs.'
        }
    }
}
