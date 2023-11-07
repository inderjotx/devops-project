pipeline {
    agent any
	 tools {
        jdk 'jdk'
        nodejs 'node'
    }
	
	 environment {
        	SCANNER_HOME = tool 'sonar'
    	}
	
    stages {
        stage('testing') {
            steps {
                script {
			sh 'echo "Starting the testing step...."'
                }
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
	stage("quality gate") {
          	  steps {
                	script {
                   		 waitForQualityGate abortPipeline: false, credentialsId: 'sonar'
                }
            }
        }
	    
	    stage('OWASP FS SCAN') {
            steps {
                dependencyCheck additionalArguments: '--scan ./ --disableYarnAudit --disableNodeAudit', odcInstallation: 'checker'
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }
	    
        stage('TRIVY FS SCAN') {
            steps {
                sh "trivy fs . > trivyfs.txt"
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
