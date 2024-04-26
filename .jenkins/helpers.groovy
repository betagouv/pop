def Test(String project) {
    dir("apps/${project == "edition" ? "production" : "${project}"}/") {
        sh "npm run test"
    }
}

def GetImageURL(String project) {
    return "${env.MAIN_DOCKER_REGISTRY_HOST}/${DOMAIN}/pop-${project}:${TAG}"
}

def BuildDockerApp(String project) {
    dir("apps/${project == "edition" ? "production": "${project}"}/") {
        def imageURL = GetImageURL(project)
        def now = new Date()
        def now_str = now.format("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", TimeZone.getTimeZone('UTC'))
        def shortCommit = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%h'").trim()
        docker.withRegistry("https://${env.MAIN_DOCKER_REGISTRY_HOST}", "main-registry-robot-${DOMAIN}") {
            def image = docker.build(imageURL, "--build-arg APP_VERSION=${APP_VERSION} --build-arg CREATED_AT=${now_str} --build-arg SRC_REF=${shortCommit} .")
        }
    }
}

def TagDockerApp(String project) {
    def imageURL = GetImageURL(project)
    def shortCommit = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%h'").trim()
    def gitBranch =  env.GIT_BRANCH.replaceAll("origin/", "")
    def branch = gitBranch.replaceAll("[^a-zA-Z0-9]+","-")
    def image = docker.image(imageURL)
    docker.withRegistry("https://${env.MAIN_DOCKER_REGISTRY_HOST}", "main-registry-robot-${DOMAIN}") {
        //image.push()
        image.push("latest")
        image.push(shortCommit)
        image.push(branch)
        image.push("${TAG}")
    }
}

return this