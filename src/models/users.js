import database from '#database'

class User {

    addUser(user) {
        return database
            .insert(user)
            .into('users')
    }

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

    // delete
    // update

}

export default new User()