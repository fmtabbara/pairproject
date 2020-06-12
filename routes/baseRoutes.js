const express = require('express')
const bcrypt = require('bcrypt')
const { db } = require('../db')
const { isValidCredentials } = require('../validation')

const baseRoutes = express.Router()

baseRoutes.post('/register', (req, res) => {
  const { username, password } = req.body
  const response = isValidCredentials({ username, password })

  if (!response.isValid) {
    res.status(400).send(response.errors)
  } else {
    bcrypt.hash(password, 10, (err, hash) => {
      db('users')
        .insert({ username, password: hash })
        .then(() => res.send("You're access has been set up. Have fun!"))
        .catch((err) => res.status(400).send(err))
    })
  }
})

baseRoutes.post('/login', (req, res) => {
  const { username, password } = req.body

  db('users')
    .first()
    .where({ username })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password).then((result) => {
          if (result) {
            res.send('login success')
          } else {
            res.send('login fail')
          }
        })
      } else {
        res.send('user not found')
      }
    })
    .catch((e) => res.status(400).send(e))
})

baseRoutes.get('/logout', (req, res) => {
  res.send('logout route')
})

module.exports = { baseRoutes }
