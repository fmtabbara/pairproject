require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const knex = require('knex')
const { connection } = require('./db')
const { userRoutes } = require('./routes/userRoutes')

const app = express()

const PORT = process.env.PORT || 3001

const db = knex({
  client: 'pg',
  connection,
})

app.use(bodyParser.json())

// User Routes

app.use(
  '/users',
  (req, res, next) => {
    req.db = db
    next()
  },
  userRoutes
)

app.use('/register', (req, res) => {
  res.send('registration route')
})

app.use('/login', (req, res) => {
  res.send('login route')
})

app.use('/logout', (req, res) => {
  res.send('logout route')
})

// Fallback route

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
