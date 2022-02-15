pipeline {
    agent any


    stages {
        stage('Setup') {
            steps {
                powershell "npm ci"
            }
            
        }
        stage('Tests') {
            steps {
                powershell "npm run cy:tags TAGS=$tags"
            }
        }
    }
    post {
         always {
            script {
                cucumber fileIncludePattern: '**/*.json', jsonReportDirectory: 'reports', sortingMethod: 'ALPHABETICAL'
            }
         }
    }
}
