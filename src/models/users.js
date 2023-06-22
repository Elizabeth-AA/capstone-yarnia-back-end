import database from '#database'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import generateToken from '#utils/helpers.js'
import { hashPassword } from '#utils/helpers.js'

class User {
    getById(id) {
        return database
            .distinct('id')
            .first()
            .from('users')
            .where('id', id)
            .select('id', 'username', 'profile', 'email')
    }

    getStash(id) {
        return database
            .from('yarn')
            .innerJoin('users_yarn', 'yarn.id', '=', 'yarn_id')
            .innerJoin('users', 'users_yarn.user_id', '=', 'users.id')
            .where('users.id', '=', id)
    }

    async addUser(data) {
        try {
            const hashedPassword = await hashPassword(data.password)
            const userData = {
                username: data.username,
                email: data.email_address,
                password: hashedPassword,
            }
            const [userId] = await database
                .insert(userData)
                .into('users')
            const token = generateToken({ username: userData.username })
                return { token, userId }
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async authUser(user) {
        try {
            const retrievedUser = await database
                .from('users')
                .where('email', user.email)
                .first()
            if (!retrievedUser) throw new Error('user not found')
            const passwordMatch = await bcrypt.compare(user.password, retrievedUser.password)
            if (!passwordMatch) throw new Error('incorrect password')
            const payload = { user: retrievedUser }
            const secret = 'SECRET'
            const token = jwt.sign(payload, secret, { expiresIn: '1800s' });
    return { token, userId: retrievedUser.id };
  } catch (error) {
    throw error;
  }
        }

    // async addStashItem(id, data)
    async addStashItem(data) {
        let yarn_id = null

        try {
            const existingYarn = await database.from('yarn').where('rav_id', data.rav_id)

            if (!existingYarn) {
                const [newYarnId] = await database.insert({ ...data }).into('yarn')
                yarn_id = newYarnId
            } else {
                yarn_id = existingYarn.yarn_id
            }
        } catch (error) {
            console.log(error)
        } finally {
            if (yarn_id !== null) {
                await database
                    // .insert({user_id: id, yarn_id: yarnId})
                    .insert({ user_id: user_id, yarn_id: yarn_id })
                    .into('users_yarn')
                return yarn_id
            }
        }
    }
}

// delete
// update

export default new User()
