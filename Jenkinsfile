pipeline {
    agent {
        docker {
            image 'node:20.9.0-alpine3.18'
            args '--user root --privileged'
        }
    }
    stages {
        stage('testing') {
            steps {
                script {
                    cleanWs()
                    sh 'id'
                    sh 'cat /etc/passwd'
                }
            }
        }
        stage('build') {
            steps {
                sh 'npm cache clean --force'
                sh 'npm ci'
            }
        }
    }
}
