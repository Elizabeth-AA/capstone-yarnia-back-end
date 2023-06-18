import jwt from 'jsonwebtoken'

export default function generateToken(username) {
    const payload = { username };
    const options = { expiresIn: '24h' };
    return jwt.sign(payload, secret, options);
}