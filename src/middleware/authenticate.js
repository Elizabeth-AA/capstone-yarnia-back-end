import jwt from 'jsonwebtoken'
import database from '#database'
import { generateTokens } from '#utils/helpers.js'

export default function authenticate(req, res, next) {
    const accessTokenSecret = "SECRET"
    const refreshTokenSecret = "SECRET"

    const accessToken = req.headers.authorization

    if (!accessToken) {
        return res.status(401).json({ message: 'Missing token' })
    }

    const formattedToken = accessToken.replace('Bearer ', '')

    jwt.verify(formattedToken, accessTokenSecret, (err, decoded) => {
        if (err) {
            console.log('Token verification error:', err)
            return res.status(401).json({ message: "Invalid token" })
        }
        console.log("verify decoded ", decoded)
        const { username, exp } = decoded
        console.log('verify ', username)

        if (Date.now() >= exp * 1000) {
            const refreshToken = req.header('refreshToken')
            if (!refreshToken) {
                return res.status(401).json({ message: "token expired, missing refresh token" })
            }
            jwt.verify(refreshToken, refreshTokenSecret, (err, decoded) => {
                if (err) {
                    console.log('Refresh token verification error:', err)
                    return res.status(401).json({ message: "Invalid refresh token" })
                }
                const user = decoded
                const { accessToken, refreshToken } = generateTokens(user)
                res.json({ accessToken, refreshToken, userId: user.id })
            })
        } else {
            return database
            .select()
            .from('users')
            .where('username', username)
            .first()
            .then(user => {
                if (!user) {
                    return res.status(401).json({ message: 'User not found' })
                }
                req.user = user
                next()
            })
            .catch((error) => {
                console.log('Database error:', error)
                res.status(500).json({ message: 'database error' });
              })
}})
        }
