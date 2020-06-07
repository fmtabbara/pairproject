const express = require('express')
const bodyParser = require('body-parser')
const { v4: uuid } = require('uuid')
const { isValidTodo, validComplete } = require('./validation')
const knex = require('knex')
require('dotenv').config()

const app = express()
const PORT = process.env.SERVER_PORT || 3001

const db = knex({
  client: 'pg',
  connection: {
    port: process.env.DB_PORT,
    user: 'postgres',
    password: process.env.DB_PASSWORD,
    database: 'pairproject',
  },
})

app.use(bodyParser.json())

function Todo({ id, userid, name }) {
  this.id = id
  this.name = name
  this.complete = false
  this.userid = +userid
}

// GET
// Fetch all todos for a given user

app.get('/users/:userid/todos', (req, res) => {
  const { userid } = req.params

  // to be completed
})

// GET
// Fetch single todo for a given user

app.get('/users/:userid/todos/:todoid', (req, res) => {
  const { userid, todoid } = req.params

  // to be completed
})

// POST
// Add a new todo for a given user

app.post('/users/:userid/todo', (req, res) => {
  const { userid } = req.params
  const { name } = req.body
  const isValid = isValidTodo(name)

  // to be completed
})

// PATCH
// Update a todo name for a given user

app.patch('/users/:userid/todo/:todoid', (req, res) => {
  const { todoid, userid } = req.params
  const { name } = req.body
  const isValidName = isValidTodo(name)

  if (isValidName) {
    db('todos')
      .update({ name })
      .where({
        userid: +userid,
        id: todoid,
      })
      .then((results) => {
        if (results === 0) {
          res.status(403).send('Sorry todo not found')
        } else {
          res.redirect(303, `/users/${userid}/todos`)
        }
      })
      .catch((e) => res.status(400).send(e))
  } else {
    return res.status(403).send('Sorry not able to update todo')
  }
})

// PATCH
// Update a todo with status for a given user

app.patch('/users/:userid/todo/:todoid/complete', (req, res) => {
  const { todoid, userid } = req.params
  const { complete } = req.body
  const isValid = validComplete(complete)

  if (isValid) {
    db('todos')
      .update({ complete })
      .where({
        userid: +userid,
        id: todoid,
      })
      .then((results) => {
        if (results === 0) {
          res.status(403).send('Sorry todo not found')
        } else {
          res.redirect(303, `/users/${userid}/todos`)
        }
      })
      .catch((e) => res.status(400).send(e))
  } else {
    return res.status(403).send('Sorry not able to update todo')
  }
})

// DELETE
// Delete a todo for a given user

app.delete('/users/:userid/todo/:todoid', (req, res) => {
  const { userid, todoid } = req.params

  db('todos')
    .del()
    .where({
      userid: +userid,
      id: todoid,
    })
    .then((result) => {
      if (result === 0) {
        console.log(result)
        return res.send('unable to delete todo')
      } else {
        res.redirect(303, `/users/${userid}/todos`)
      }
    })
    .catch((e) => res.send(e))
})

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
