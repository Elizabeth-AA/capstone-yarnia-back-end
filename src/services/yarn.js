import Yarn from '#models/yarn.js'

class yarnService {
    getById(id) {
        return Yarn.getById(id)
    }

    addYarn(yarn) {
        return Yarn.addYarn(yarn)
    }
}