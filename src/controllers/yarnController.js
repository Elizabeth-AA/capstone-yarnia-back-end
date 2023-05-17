import YarnService from '#services/yarn.js'

class YarnController {
    async getById(req, res) {
        try {
            const data = await YarnService.getById(req.body.rav_id)
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async addYarn(req, res) {
        try {
            await YarnService.addYarn(req.body)
            res.sendStatus(201)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default new YarnController()