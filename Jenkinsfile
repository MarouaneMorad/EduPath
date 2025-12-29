pipeline {
    agent any

    environment {
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
                checkout scm
                echo 'Code source récupéré.'
            }
        }

        stage('Preparation') {
            steps {
                script {
                    echo 'Création des dossiers manquants pour RecoBuilder...'
                    sh "mkdir -p ${RECO_BUILDER_DIR}/models ${RECO_BUILDER_DIR}/indexes"
                    sh "touch ${RECO_BUILDER_DIR}/models/.gitkeep ${RECO_BUILDER_DIR}/indexes/.gitkeep"
                }
            }
        }

        stage('Tests') {
            parallel {
                stage('Test LMSConnector') {
                    steps {
                        dir("${LMS_CONNECTOR_DIR}") {
                            echo 'Running LMSConnector tests...'
                            sh 'npm install && npm test'
                        }
                    }
                }
                stage('Test PathPredictor') {
                    steps {
                        dir("${PATH_PREDICTOR_DIR}") {
                            echo 'Running PathPredictor tests...'
                            sh 'pip install -r requirements.txt && pytest'
                        }
                    }
                }
                stage('Test PrepaData') {
                    steps {
                        dir("${PREPA_DATA_DIR}") {
                            echo 'Running PrepaData tests...'
                            sh 'pip install -r requirements.txt && pytest'
                        }
                    }
                }
                stage('Test RecoBuilder') {
                    steps {
                        dir("${RECO_BUILDER_DIR}") {
                            echo 'Running RecoBuilder tests...'
                            sh 'pip install -r requirements.txt && pytest'
                        }
                    }
                }
                stage('Test StudentProfiler') {
                    steps {
                        dir("${STUDENT_PROFILER_DIR}") {
                            echo 'Running StudentProfiler tests...'
                            sh 'pip install -r requirements.txt && pytest'
                        }
                    }
                }
            }
        }

        stage('Build Services') {
            when {
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            parallel {
                stage('Build LMSConnector') {
                    steps {
                        dir("${LMS_CONNECTOR_DIR}") {
                            sh 'docker build -t lms-connector:latest .'
                        }
                    }
                }
                stage('Build PathPredictor') {
                    steps {
                        dir("${PATH_PREDICTOR_DIR}") {
                            sh 'docker build -t path-predictor:latest .'
                        }
                    }
                }
                stage('Build PrepaData') {
                    steps {
                        dir("${PREPA_DATA_DIR}") {
                            sh 'docker build -t prepa-data:latest .'
                        }
                    }
                }
                stage('Build RecoBuilder') {
                    steps {
                        dir("${RECO_BUILDER_DIR}") {
                            sh 'docker build -t reco-builder:latest .'
                        }
                    }
                }
                stage('Build StudentCoach Backend') {
                    steps {
                        dir("${STUDENT_COACH_DIR}") {
                            sh 'docker build -t student-coach-backend:latest .'
                        }
                    }
                }
                stage('Build StudentProfiler') {
                    steps {
                        dir("${STUDENT_PROFILER_DIR}") {
                            sh 'docker build -t student-profiler:latest .'
                        }
                    }
                }
            }
        }

        stage('Cleanup') {
            steps {
                sh 'docker image prune -f'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check stage logs.'
        }
    }
}
