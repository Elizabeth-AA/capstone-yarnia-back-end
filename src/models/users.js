import database from '#database'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generateTokens } from '#utils/helpers.js'
import { hashPassword } from '#utils/helpers.js'

class User {

    getStash(userId) {
        return database
            .from('yarn')
            .innerJoin('users_yarn', 'yarn.id', '=', 'yarn_id')
            .innerJoin('users', 'users_yarn.user_id', '=', 'users.id')
            .where('users.id', '=', userId)
    }

    async addUser(data) {
        try {
            const hashedPassword = await hashPassword(data.password)
            const userData = {
                username: data.username,
                email: data.email_address,
                password: hashedPassword,
            }
            const [userId] = await database.insert(userData).into('users')
            const { accessToken, refreshToken } = generateToken({ username: userData.username })
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
            console.log("model ", accessToken)
            return { accessToken, refreshToken, userId: retrievedUser.id }
        } catch (error) {
            throw error
        }
    }

    async addStashItem(userId, yarnData) {
        console.log("model userId ", userId)
        console.log("model yarnData ", yarnData)
        let yarnId = null

        try {
            const existingYarn = await database.from('yarn').where('rav_id', yarnData.rav_id).first()

            if (!existingYarn) {
                const [newYarnId] = await database.insert({ ...yarnData }).into('yarn')
                yarnId = newYarnId
            } else {
                yarnId = existingYarn.yarn_id
            }
            await database.insert({ user_id: userId, yarn_id: yarnId }).into('users_yarn')
            return yarnId
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

// delete
// update

export default new User()
