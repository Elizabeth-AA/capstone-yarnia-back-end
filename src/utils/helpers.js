import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function hashPassword(password) {
    try {
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        return hashedPassword
    } catch (err) {
        console.log(err)
        throw err
    }
}

export async function comparePassword(password, hash) {
    try {
        return await bcrypt.compare(password, hash)
    } catch (e) {
        console.log(e)
    }
}

export default function generateToken(user) {
    return jwt.sign(user, "SECRET", { expiresIn: '1h' })
}