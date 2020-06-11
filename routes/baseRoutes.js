const express = require('express')
const { db } = require('../db')

const baseRoutes = express.Router()

baseRoutes.get('/register', (req, res) => {
  res.send(results)
})

baseRoutes.get('/login', (req, res) => {
  res.send('login route')
})

baseRoutes.get('/logout', (req, res) => {
  res.send('logout route')
})

module.exports = { baseRoutes }
