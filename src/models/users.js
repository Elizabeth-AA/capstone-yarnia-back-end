import database from '#database'

class User {

    getStash(userId) {
        return database
            .from('yarn')
            .innerJoin('users_yarn', 'yarn.id', '=', 'yarn_id')
            .innerJoin('users', 'users_yarn.user_id', '=', 'users.id')
            .where('users.id', '=', userId)
    }

    async addStashItem(userId, yarnData) {
        let yarnId = null
        try {
            const existingYarn = await database.from('yarn').where('rav_id', yarnData.rav_id).first()
            
            if (!existingYarn) {
                const [newYarnId] = await database.insert({ ...yarnData }).into('yarn')
                yarnId = newYarnId
            } else {
                yarnId = existingYarn.id
            }
            await database.insert({ user_id: userId, yarn_id: yarnId }).into('users_yarn')
            return yarnId
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async deleteStashItem(userId, yarnId) {
        try {
          await database.from('users_yarn').where({
            user_id: userId,
            yarn_id: yarnId,
          }).delete();
          return;
        } catch (error) {
          console.log(error);
          throw error;
        }
      }

}

export default new User()
