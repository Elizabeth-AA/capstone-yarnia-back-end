import UserService from '#services/users.js'

class UserController {
    async getById(req, res) {
        try {
            const data = await UserService.getById(req.params.id)
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async getStash(req, res) {
        try {
            const data = await UserService.getStash(req.params.id)
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async addUser(req, res) {
        try {
            await UserService.addUser(req.body, res)
            res.sendStatus(201)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async authUser(req, res) {
        try {
            await UserService.authUser(req.body)
            res.sendStatus(201)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async addStashItem(req, res) {
        try {
            await UserService.addStashItem(req.body)
            res.sendStatus(201)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default new UserController()