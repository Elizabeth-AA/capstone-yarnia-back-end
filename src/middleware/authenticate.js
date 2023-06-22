import jwt from 'jsonwebtoken'

export default function authenticate(req, res, next) {
    const token = req.header('Authorization')

    if (!token) {
        return res.status(401).json({ message: 'Missing token' })
    }

    const formattedToken = token.replace('Bearer ', '')
    const secret = "SECRET"

    jwt.verify(formattedToken, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" })
        }
        const { username } = decoded
        return database
            .from('users')
            .where({ username })
            .first()
            .then(user => {
                if (!user) {
                    return res.status(401).json({ message: 'User not found' })
                }
                req.user = user
                next()
            })
            .catch((error) => {
                res.status(500).json({ message: 'Internal server error' });
              })
    })
}