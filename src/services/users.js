import User from '#models/users.js'

class UserService {
    
    getStash(userId) {
        return User.getStash(userId)
    }

    addStashItem(userId, yarnData) {
        return User.addStashItem(userId, yarnData)
    }
}

export default new UserService()