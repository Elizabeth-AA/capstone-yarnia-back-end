import jwt from 'jsonwebtoken'

export default function authenticate(req, res, next) {
    const token = req.header('Authorization')

    if (!token) {
        return res.status(401).json({ message: 'Missing token' })
    }

    const secret = "SECRET"

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" })
        }
        req.user = decoded
        next()
    })
}

//         return database
//             .from('users')
//             .where({username: payload.username})
//             .first()
//             .then(user => {
//                 req.user = user
//                 next()
//             }).catch(error => {
//                 res.status(500).json({ message: "Internal server error" })
//             })
//     })
// }