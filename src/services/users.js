import User from '#models/users.js'

class UserService {
    getById(id) {
        return User.getById(id)
    }

    getStash(id) {
        return User.getStash(id)
    }

    addUser(data) {
        return User.addUser(data)
    }

    authUser(user) {
        return User.authUser(user)
    }

    addStashItem(userId, yarnData) {
        return User.addStashItem(userId, yarnData)
    }
    // addStashItem(id, data) {
    //     return User.addStashItem(id, data)
    // }
}

export default new UserService()