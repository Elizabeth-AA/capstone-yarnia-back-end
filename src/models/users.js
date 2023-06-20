import database from '#database'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import generateToken from "#utils/helpers.js"
import { hashPassword } from '#utils/helpers.js'

class User {

    getById(id) {
        return database
            .distinct('id')
            .first()
            .from('users')
            .where('id', id)
            .select(
                'id',
                'username',
                'profile',
                'email',
            )
    }

    getStash(id) {
        return database
            .from('yarn')
            .innerJoin('users_yarn', 'yarn.id', '=', 'yarn_id')
            .innerJoin('users', 'users_yarn.user_id', '=', 'users.id')
            .where('users.id', '=', id)
    }

    async addUser(data) {
        console.log(data)
        try {
            const hashedPassword = await hashPassword(data.password)
            console.log(hashedPassword)
            const userData = {
                username: data.username,
                email: data.email_address,
                password: hashedPassword,
            }
            console.log(userData)
            return database
                .insert(userData)
                .into('users')
        } catch (err) {
            console.log(err)
        }
        // console.log(data)

        // .hash(data.password, 12)
        //     .then(hashed_password => {
        //         const userData = {
        //             username: data.username,
        //             email: data.email_address,
        //             password: hashed_password,
        //         }
        //         console.log(userData)
        //         return database
        //         .insert(userData)
        //         .into('users')
        //         .returning("*")
        //         .then((users) => {
        //             const user = users[0]
        //             const token = generateToken(user.username)
        //             return { user, token }
        //         })
        //         .catch((error) => {
        //             response.status(500).json({ error: error.message })
        //         })
        //     })
        //     .catch((error) => {
        //         response.status(500).json({ error: error.message });
        //       });
    }



    authUser(user) {
        // const { user } = req.body
        return database
            .from('users')
            .where({ username: user.username })
            .first()
            .then(retrievedUser => {
                if(!retrievedUser) throw new Error("user not found")
                return Promise.all([
                    bcrypt.compare(user.password, retrievedUser.password),
                    Promise.resolve(retrievedUser)
                ]).then(results => {
                    const passwordMatch = results[0]
                    if(!passwordMatch) throw new Error("incorrect password")
                    const user = results[1]
                    const payload = {username: user.username}
                    const secret = "SECRET"
                    jwt.sign(payload, secret, (error, token) => {
                        if(error) throw new Error("sign in error")
                        response.json({token, user})
                    }).catch(error => {
                        response.json({message: error.message})
                    })
                })
            })
    }
    
    // async addStashItem(id, data)
    async addStashItem(data) {
        let yarn_id = null

        try {
            const existingYarn = await database
                .from('yarn')
                .where('rav_id', data.rav_id)
            
            if (!existingYarn) {
                const [newYarnId] = await database
                    .insert({...data})
                    .into('yarn');
                yarn_id = newYarnId;
            } else {
                yarn_id = existingYarn.yarn_id
            }   
        }  catch (error) {
            console.log(error)
        }
        finally {
            if (yarn_id !== null) {
            await database
                // .insert({user_id: id, yarn_id: yarnId})
                .insert({user_id: user_id, yarn_id: yarn_id})
                .into('users_yarn')
            return yarn_id;    
        }}
    }
}

    // delete
    // update

export default new User()