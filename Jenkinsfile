pipeline {
    agent {
        docker {
            image 'node:20.9.0-alpine3.18'
            args '--user root --privileged'
        }
    }


	 environment {
        	SCANNER_HOME = tool 'sonar'
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
	
	stage('testing-sonar'){
		steps{
		withSonarQubeEnv('sonar') {
                    sh '''$SCANNER_HOME/bin/sonar-scanner -Dsonar.projectName=react\
                    -Dsonar.projectKey=react'''
                }		
}
	}
    }
}
