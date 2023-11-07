pipeline {
    agent { docker { 
	    image 'node:20.9.0-alpine3.18'
	    args '-u root --privileged'
    } }
    stages {
        stage('tesing') {
            steps {
                sh 'cleanWs()'
		sh 'id'
		sh ''
            }
        }
	
	stage('build'){
		steps{
		sh ' npm cache clean --force '
		sh 'npm ci'	
	    }	
    }

}
}
