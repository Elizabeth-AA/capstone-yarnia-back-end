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
            const { token, userId } = await UserService.addUser(req.body)
            res.status(201).json({ token, userId })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async authUser(req, res) {
        try {
            const user = req.body
            const { token, userId } = await UserService.authUser(user)
            return res.status(201).json({ token, userId })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    async addStashItem(req, res) {
        try {
            const userId = req.params.userId;
            console.log("controller userId ", userId)
            const yarnData = req.body;
            console.log("controller yarnData ", yarnData)
            await UserService.addStashItem(userId, yarnData)
            res.sendStatus(201)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default new UserController()