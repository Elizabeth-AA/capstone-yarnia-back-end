require('dotenv').config({ path: '../../../.env' })
const { knexSnakeCaseMappers } = require('objection')

module.exports = {
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
    migrations: {
        directory: '../migrations',
        tableName: '20230402170859_create_tables',
    },
    seeds: {
        directory: '../seeds',
    },
    ...knexSnakeCaseMappers,
  };