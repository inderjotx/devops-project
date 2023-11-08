pipeline {
    agent any
	 tools {
        jdk 'jdk'
        nodejs 'node'
    }
	
	 environment {
        	SCANNER_HOME = tool 'sonar'
			IMAGE = 'inderharrysingh/react-app'
			TAG = sh(script: 'date +%s', returnStdout: true).trim()
    	}
	
    stages {
        stage('testing') {
            steps {
                script {
					sh 'echo "Starting the testing step...."'
					sh 'echo $TAG'
                }
            }
}
	    
	// stage('testing-sonar'){

		
	// 	steps{
	// 		withSonarQubeEnv('sonar') {
    //                 	sh '''$SCANNER_HOME/bin/sonar-scanner -Dsonar.projectName=react\
    //                 	-Dsonar.projectKey=react'''
    //             	}		
    //    		}	
	// }
	// stage("quality gate") {
    //       	  steps {
    //             	script {
    //                		 waitForQualityGate abortPipeline: false, credentialsId: 'sonar'
    //             }
    //         }
    //     }
	    
	//     stage('OWASP FS SCAN') {
    //         steps {
    //             dependencyCheck additionalArguments: '--scan ./ --disableYarnAudit --disableNodeAudit', odcInstallation: 'checker'
    //             dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
    //         }
    //     }
	    
    //     stage('TRIVY FS SCAN') {
    //         steps {
    //             sh "trivy fs . > trivyfs.txt"
    //         }
    //     }
	        
        stage('build') {
            	steps {
                	sh 'npm cache clean --force'
                	sh 'npm ci'
	
        	    }
	        }
	

	stage('docker push'){
		steps{
	  	  script {
			withCredentials([usernamePassword(credentialsId: 'docker', usernameVariable: 'DOCKER_HUB_USERNAME', passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
                        	sh "docker login -u $DOCKER_HUB_USERNAME -p $DOCKER_HUB_PASSWORD"	
							sh "docker build -t $IMAGE:v$TAG ."
							sh "docker run -d -p 5000:80  $IMAGE:v$TAG "
							sh "docker push $IMAGE:v$TAG"
							
                    }
			}
         }
     }

	stage('update gitrepo for argo cd '){
		steps{
			 script {

					cleanWs()
                    withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {
                        sh """
                        git clone https://inderharrysingh:${GITHUB_TOKEN}@github.com/inderharrysingh/devSecOps-image.git
                        cd devSecOps-image
						chmod +x update-tag
						./update-tag $TAG
                        git commit -am "Commit message"
                        git push
                        """
                    }
                }
		}
	}

}
}
