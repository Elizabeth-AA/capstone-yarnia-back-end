import Auth from '#models/auth.js'

class AuthService {

    addUser(data) {
        return Auth.addUser(data)
    }

    authUser(user) {
        return Auth.authUser(user)
    }
}

export default new AuthService()