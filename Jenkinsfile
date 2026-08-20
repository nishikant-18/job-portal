pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build Application') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t job-portal:${BUILD_NUMBER} .'
            }
        }

    }

    post {
        success {
            echo '✅ CI Pipeline completed successfully!'
        }

        failure {
            echo '❌ CI Pipeline failed!'
        }
    }
}
