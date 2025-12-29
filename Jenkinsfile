pipeline {
    agent any

    environment {
        // Define directory paths for each service
        LMS_CONNECTOR_DIR = 'LMSConnector'
        PATH_PREDICTOR_DIR = 'path-predictor'
        PREPA_DATA_DIR = 'prepa-data'
        RECO_BUILDER_DIR = 'reco-builder'
        STUDENT_COACH_DIR = 'student-coach/backend'
        STUDENT_PROFILER_DIR = 'student-profiler'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code (automatic in Jenkins jobs configured with SCM)
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Build LMSConnector') {
            steps {
                dir("${LMS_CONNECTOR_DIR}") {
                    script {
                        echo 'Building LMSConnector service...'
                        sh 'docker build -t lms-connector:latest .'
                    }
                }
            }
        }

        stage('Build PathPredictor') {
            steps {
                dir("${PATH_PREDICTOR_DIR}") {
                    script {
                        echo 'Building PathPredictor service...'
                        sh 'docker build -t path-predictor:latest .'
                    }
                }
            }
        }

        stage('Build PrepaData') {
            steps {
                dir("${PREPA_DATA_DIR}") {
                    script {
                        echo 'Building PrepaData service...'
                        sh 'docker build -t prepa-data:latest .'
                    }
                }
            }
        }

        stage('Build RecoBuilder') {
            steps {
                dir("${RECO_BUILDER_DIR}") {
                    script {
                        echo 'Building RecoBuilder service...'
                        sh 'docker build -t reco-builder:latest .'
                    }
                }
            }
        }

        stage('Build StudentCoach Backend') {
            steps {
                dir("${STUDENT_COACH_DIR}") {
                    script {
                        echo 'Building StudentCoach Backend service...'
                        sh 'docker build -t student-coach-backend:latest .'
                    }
                }
            }
        }

        stage('Build StudentProfiler') {
            steps {
                dir("${STUDENT_PROFILER_DIR}") {
                    script {
                        echo 'Building StudentProfiler service...'
                        sh 'docker build -t student-profiler:latest .'
                    }
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    echo 'Cleaning up dangling images...'
                    sh 'docker image prune -f'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully! All services built.'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}
