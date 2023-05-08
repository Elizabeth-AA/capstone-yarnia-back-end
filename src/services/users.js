import User from '#models/users.js'

class UserService {
    getById(id) {
        return User.getById(id)
    }

    getStash(id) {
        return User.getStash(id)
    }

    addUser(user) {
        return User.addUser(user)
    }
}

export default new UserService()