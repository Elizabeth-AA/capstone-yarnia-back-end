import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function hashPassword(password) {
    try {
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        console.log(hashedPassword)
        return hashedPassword
    } catch (err) {
        console.log(err)
        throw err
    }
    // bcrypt
    //     .hash(password, 10)
    //     .then(hash => {
    //         // store in db
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
}

export async function comparePassword(password, hash) {
    try {
        return await bcrypt.compare(password, hash)
    } catch (e) {
        console.log(e)
    }
}

export default function generateToken(user) {
    return jwt.sign(user, "SECRET", { expiresIn: '1800s' })
}