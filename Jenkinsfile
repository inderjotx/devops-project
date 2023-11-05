pipeline {
    agent { docker { image 'node:20.9.0-alpine3.18' } }
    stages {
        stage('tesing') {
            steps {
                sh 'ls'
            }
        }
	
	stage('build'){
		steps{
		sh 'npm install'	
	    }	
    }

}
}
