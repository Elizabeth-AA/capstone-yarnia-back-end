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

    authUser(user) {
        return User.addUser(user)
    }

    addStashItem(data) {
        return User.addStashItem(data)
    }
    // addStashItem(id, data) {
    //     return User.addStashItem(id, data)
    // }
}

export default new UserService()