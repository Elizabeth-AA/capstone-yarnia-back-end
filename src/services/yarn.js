import Yarn from '#models/yarn.js'

class YarnService {
    getById(rav_id) {
        return Yarn.getById(rav_id)
    }

    addYarn(yarn) {
        return Yarn.addYarn(yarn)
    }
}

export default new YarnService()