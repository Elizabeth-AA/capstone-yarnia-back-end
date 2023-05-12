import database from '#database'

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

    getByEmail(email) {
        return database
            .from('users')
            .where('email', email)
            .first()
    }

    getStash(id) {
        return database
            .from('yarn')
            .innerJoin('users_yarn', 'yarn.id', '=', 'yarn_id')
            .innerJoin('users', 'users_yarn.user_id', '=', 'users.id')
            .where('users.id', '=', id)
    }

    addUser(user) {
        return database
            .insert(user)
            .into('users')
    }

    async addStashItem(id, data) {
        try {
            const existingYarn = await database
                .from('yarn')
                .where('rav_id', data.rav_id)
                .first();
            let yarnId;
            
            if (!existingYarn) {
                const [newYarnId] = await database
                    .insert({...data})
                    .into('yarn');
                yarnId = newYarnId;
            } else {
                yarnId = existingYarn.yarn_id
            }   
        } finally {
            await database
                .insert({user_id: id, yarn_id: yarnId})
            return yarnId;    
        }
    }


    // delete
    // update

}

export default new User()