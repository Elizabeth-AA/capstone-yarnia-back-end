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
    // async addStashItem(id, data)
    async addStashItem(data) {
        let yarn_id = null

        try {
            const existingYarn = await database
                .from('yarn')
                .where('rav_id', data.rav_id)
            
            if (!existingYarn) {
                const [newYarnId] = await database
                    .insert({...data})
                    .into('yarn');
                yarn_id = newYarnId;
            } else {
                yarn_id = existingYarn.yarn_id
            }   
        }  catch (error) {
            console.log(error)
        }
        finally {
            if (yarn_id !== null) {
            await database
                // .insert({user_id: id, yarn_id: yarnId})
                .insert({user_id: user_id, yarn_id: yarn_id})
                .into('users_yarn')
            return yarn_id;    
        }}
    }
}

    // delete
    // update



export default new User()