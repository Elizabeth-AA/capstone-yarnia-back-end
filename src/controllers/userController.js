import UserService from '#services/users.js'

class UserController {

    async getStash(req, res) {
        try {
            const userId = req.params.userId;
            const data = await UserService.getStash(userId)
            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    async addStashItem(req, res) {
        try {
            const userId = req.params.userId;
            const yarnData = req.body;
            await UserService.addStashItem(userId, yarnData)
            return res.status(201).send()
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    async deleteStashItem(req, res) {
        try {
          const userId = req.params.userId;
          const yarnId = req.params.yarnId;
          await UserService.deleteStashItem(userId, yarnId);
          return res.status(204).send();
        } catch (error) {
          return res.status(500).json({ message: error.message });
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