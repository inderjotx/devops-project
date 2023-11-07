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
	
	stage('running'){
		steps{
			sh 'docker run --name=react inderharrysingh/react-app -p 5000:80 --on-failure=restart '
		}
	}


	stage('push'){
		steps{
			withCredentials([usernamePassword(credentialsId: 'docker', usernameVariable: 'DOCKER_HUB_USERNAME', passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
                        	sh "docker login -u $DOCKER_HUB_USERNAME -p $DOCKER_HUB_PASSWORD"
				 def TAG = sh(script: './update_tag', returnStdout: true).trim()
				sh "docker push $IMAGE:v$TAG"
				
                    }
         }

     }
}
}
