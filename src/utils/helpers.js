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

export async function generateTokens(user) {
    try {
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password
          };
        console.log(payload)
  
        const accessToken = jwt.sign(payload, "SECRET", { expiresIn: '30m' })
        console.log("access ", accessToken)
        const refreshToken = jwt.sign(payload, "SECRET", { expiresIn: '7d' })
        console.log("refresh ", refreshToken)
        return { accessToken, refreshToken }
    } catch (error) {
        throw error
    }
}