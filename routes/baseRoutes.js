const express = require('express')
const { db } = require('../db')
const { isValidCredentials } = require('../validation')

const baseRoutes = express.Router()

baseRoutes.post('/register', (req, res) => {
  const { password, username } = req.body
  const response = isValidCredentials({ username, password })

  if (!response.isValid) {
    res.status(400).send(response.errors)
  } else {
    res.send('Thanks for registering')
  }
})

baseRoutes.get('/login', (req, res) => {
  res.send('login route')
})

baseRoutes.get('/logout', (req, res) => {
  res.send('logout route')
})

module.exports = { baseRoutes }
