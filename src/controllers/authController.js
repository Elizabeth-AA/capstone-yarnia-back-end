import AuthService from '#services/auth.js'

class AuthController {
    async addUser(req, res) {
        try {
            const { token, userId } = await AuthService.addUser(req.body)
            res.status(201).json({ token, userId })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async authUser(req, res) {
        try {
            const user = req.body
            const { accessToken, refreshToken, userId } = await AuthService.authUser(user)
            return res.status(201).json({ accessToken, refreshToken, userId })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export default new AuthController()