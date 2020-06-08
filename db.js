require('dotenv').config()

const connection = process.env.NODE_ENV
  ? process.env.DATABASE_URL
  : {
      database: 'pairproject',
      port: process.env.DB_DEV_PORT,
      user: process.env.USER || 'postgres',
      password: process.env.DB_DEV_PASSWORD,
    }

module.exports = { connection }
