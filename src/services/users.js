import User from '#models/users.js'

class UserService {
    
    getStash(userId) {
        return User.getStash(userId)
    }

    addStashItem(userId, yarnData) {
        return User.addStashItem(userId, yarnData)
    }

    deleteStashItem(userId, yarnData) {
        return User.deleteStashItem(userId, yarnData)
    }

    addStashItem(data) {
        return User.addStashItem(data)
    }
}

export default new UserService()