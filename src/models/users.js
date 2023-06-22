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
            const newUser = await database
                .insert(userData)
                .into('users')
            const token = generateToken({ username: newUser.username })
                return token
        } catch (error) {
            console.log(error)
        }
    }

    async authUser(user) {
        console.log("model ", user)
        try {
            const retrievedUser = await database
                .from('users')
                .where('email', user.email)
                .first()
            console.log("retrieved user ", retrievedUser)
            if (!retrievedUser) throw new Error('user not found')
            // const passwordMatch = await Promise.all([
            //     bcrypt.compare(user.password, retrievedUser.password),
            //     Promise.resolve(retrievedUser),
            // ])
            const passwordMatch = await bcrypt.compare(user.password, retrievedUser.password)
            console.log(passwordMatch)
            if (!passwordMatch) throw new Error('incorrect password')
            const payload = { user: retrievedUser }
            console.log(payload)
            const secret = 'SECRET'
            const token = await new Promise((resolve, reject) => {
                jwt.sign(payload, secret, (error, token) => {
                  if (error) reject(error);
                  resolve(token);
                });
              });
            console.log("token ", token)
            return { token, user: retrievedUser }
            //   return response.json({ token, user: retrievedUser });
            // } catch (error) {
            //   return response.status(500).json({ message: error.message });
            } catch (error) {
                console.log("auth failed ", error)
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
