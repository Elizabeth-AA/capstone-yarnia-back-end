import jwt from 'jsonwebtoken'
import database from '#database'

export default function authenticate(req, res, next) {
    const token = req.header('Authorization')

    if (!token) {
        return res.status(401).json({ message: 'Missing token' })
    }

    const formattedToken = token.replace('Bearer ', '')
    const secret = "SECRET"

    jwt.verify(formattedToken, secret, (err, decoded) => {
        if (err) {
            console.log('Token verification error:', err)
            return res.status(401).json({ message: "Invalid token" })
        }
        const { username } = decoded.user
        console.log('verify ', username)
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
    })
}