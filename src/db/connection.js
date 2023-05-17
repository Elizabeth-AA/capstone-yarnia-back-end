import knex from 'knex'
import knexfile from './config/knexfile.cjs'

const database = knex(knexfile)

export default database