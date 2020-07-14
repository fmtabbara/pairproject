const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { db } = require('../db')
const { isValidCredentials, validToken } = require('../validation')

const baseRoutes = express.Router()

baseRoutes.post('/register', (req, res) => {
  const { name, username, password } = req.body
  const response = isValidCredentials({ name, username, password })

  if (!response.isValid) {
    res.status(400).send(response.errors)
  } else {
    db('users')
      .first()
      .where({ username })
      .then((user) => {
        if (user) {
          res.send('The username already exists 😢 Try a different one')
        } else {
          bcrypt.hash(password, 10, (err, hash) => {
            db('users')
              .insert({ name, username, password: hash })
              .then(() =>
                res.send("You're access has been set up 🚀 Have fun!")
              )
              .catch((err) => res.status(400).send(err))
          })
        }
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
        bcrypt.compare(password, user.password).then((valid) => {
          if (valid) {
            jwt.sign(
              { username },
              'privatekey',
              { expiresIn: '1h' },
              (err, token) => {
                res.send({ token })
              }
            )
          } else {
            res.status(401).json('login fail')
          }
        })
      } else {
        res.status(404).json('user not found')
      }
    })
    .catch((e) => res.status(400).send(e))
})

baseRoutes.get('/logout', (req, res) => {
  res.send('logout route')
})

baseRoutes.get('/protected', (req, res) => {
  const response = validToken(req)

  if (response.success) {
    res.send(response)
  } else {
    res.status(403).send(response)
  }
})

module.exports = { baseRoutes }
