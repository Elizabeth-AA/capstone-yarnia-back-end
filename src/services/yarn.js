import Yarn from '#models/yarn.js'

class YarnService {
    getById(id) {
        return Yarn.getById(id)
    }

    addYarn(yarn) {
        return Yarn.addYarn(yarn)
    }
}

export default new YarnService()