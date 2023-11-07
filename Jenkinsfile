pipeline {
    agent { docker { 
	    image 'node:20.9.0-alpine3.18'
	    args '-u root --privileged'
    } }
    stages {
        stage('tesing') {
            steps {
                sh 'ls'
		sh ' npm cache clean --force '
            }
        }
	
	stage('build'){
		steps{
		sh 'npm ci'	
	    }	
    }

}
}
