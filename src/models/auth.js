import database from '#database'
import bcrypt from 'bcrypt'
import { generateTokens } from '#utils/helpers.js'
import { hashPassword } from '#utils/helpers.js'

class Auth {
    async addUser(data) {
        try {
            const hashedPassword = await hashPassword(data.password)
            const userData = {
                username: data.username,
                email: data.email_address,
                password: hashedPassword,
            }
            const [userId] = await database.insert(userData).into('users')
            const { accessToken, refreshToken } = generateTokens({ username: userData.username })
            return { accessToken, refreshToken, userId }
        } catch (error) {
            throw error
        }
    }

    async authUser(user) {
        try {
            const retrievedUser = await database.from('users').where('email', user.email).first()
            if (!retrievedUser) throw new Error('user not found')
            const passwordMatch = await bcrypt.compare(user.password, retrievedUser.password)
            if (!passwordMatch) throw new Error('incorrect password')
            const { accessToken, refreshToken } = await generateTokens(retrievedUser)
            return { accessToken, refreshToken, userId: retrievedUser.id }
        } catch (error) {
            throw error
        }
    }
}

export default new Auth()