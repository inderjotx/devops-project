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
			sh 'echo "Starting the testing step...."'
			sh 'ls'
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
