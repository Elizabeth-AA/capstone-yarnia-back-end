import database from '#database'

class Yarn {

    addYarn(yarn) {
        return database
            .insert(yarn)
            .into('yarn')
    }

    getById(rav_id) {
        return database
            .distinct('rav_id')
            .first()
            .from('yarn')
            .where('rav_id', rav_id)
            .select(
                'id',
                'rav_id',
                'name',
                'yarn_company',
                'yarn_weight',
                'yardage',
                'photo',
                'permalink',
            )
    }
}

export default new Yarn()