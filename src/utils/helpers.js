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
        const result = await bcrypt.compare(password, hash)
        return result
    } catch (e) {
        console.log(e)
    }

        
        // .then(result => {
        //     return result
        // })
        // .catch(err => {
        //     console.log(err)
        // })
}

export default function generateToken(username) {
    const payload = { username };
    const options = { expiresIn: '24h' };
    return jwt.sign(payload, secret, options);
}