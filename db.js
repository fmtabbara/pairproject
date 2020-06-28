const knex = require('knex')
require('dotenv').config()

const connection = process.env.NODE_ENV
  ? process.env.DATABASE_URL
  : {
      database: 'pairproject',
      port: process.env.DB_DEV_PORT,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_DEV_PASSWORD,
    }
console.log(connection)
const db = knex({
  client: 'pg',
  connection,
})

module.exports = { db }
