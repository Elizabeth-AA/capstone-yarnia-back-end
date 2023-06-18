import jwt from 'jsonwebtoken'

export default function authenticate(req, res, next) {
    const authHeader = req.get("Authorization")
    console.log(res)
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Invalid or missing Authorization header" });
    }

    const token = authHeader.split(" ")[1]
    const secret = "SECRET"

    jwt.verify(token, secret, (error, payload) => {
        if (error) {
            return res.status(401).json({ message: "Invalid token" })
        }

        return database
            .from('users')
            .where({username: payload.username})
            .first()
            .then(user => {
                req.user = user
                next()
            }).catch(error => {
                res.status(500).json({ message: "Internal server error" })
            })
    })
}