import database from '#database'

class Yarn {

    addYarn(yarn) {
        return database
            .insert(yarn)
            .into('yarn')
    }

    getById(id) {
        return database
            .distinct('id')
            .first()
            .from('yarn')
            .where('id', id)
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