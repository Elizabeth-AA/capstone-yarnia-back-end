import UserService from '#services/users.js'

class UserController {

    async getStash(req, res) {
        try {
            const userId = req.params.userId;
            const data = await UserService.getStash(userId)
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
            const { accessToken, refreshToken, userId } = await UserService.authUser(user)
            console.log(accessToken)
            return res.status(201).json({ accessToken, refreshToken, userId })
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

    async updateAuth(req, res) {
        const refreshToken = req.body.refreshToken
        jwt.verify(refreshToken, "REFRESH_SECRET", (err, decoded) => {
            if (err) {
              console.log('Refresh token verification error:', err)
              return res.status(401).json({ message: "Invalid refresh token" })
            }
            const user = decoded.user
            const accessToken = jwt.sign(user, "SECRET", { expiresIn: '30m' })
            res.json({ accessToken })
            
    })}
}

export default new UserController()