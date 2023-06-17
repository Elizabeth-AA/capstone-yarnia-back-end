import jwt from 'jsonwebtoken'

export default function authenticate(req, res, next) {
    const authHeader = req.get("Authorization")
    const token = authHeader.split(" ")[1]
    const secret = "SECRET"
    jwt.verify(token, secret, (error, payload) => {
        if(error) throw new Error("log in error")
        return database
            .from('users')
            .where({username: payload.username})
            .first()
            .then(user => {
                req.user = user
                next()
            }).catch(error => {
                res.json({message: error.message})
            })
    })
}