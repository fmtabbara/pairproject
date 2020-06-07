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

  db('todos')
    .where({
      userid: +userid,
    })
    .then((results) => {
      if (results.length > 0) {
        return res.send(results)
      } else {
        return res.send('No todos')
      }
    })
    .catch((e) => console.log(e))
})

// GET
// Fetch single todo for a given user

app.get('/users/:userid/todos/:todoid', (req, res) => {
  const { userid, todoid } = req.params

  db('todos')
    .where({
      userid: +userid,
      id: todoid,
    })
    .then((result) => {
      if (result) {
        return res.send(result)
      } else {
        return res.send('Nothing found')
      }
    })
    .catch(() => res.send(e))
})

// POST
// Add a new todo for a given user

app.post('/users/:userid/todo', (req, res) => {
  const { userid } = req.params
  const { name } = req.body
  const isValid = isValidTodo(name)

  if (isValid) {
    const todo = new Todo({ userid, name, id: uuid() })

    db('todos')
      .insert(todo)
      .then(() => res.redirect(303, `/users/${userid}/todos`))
  } else {
    return res.status(400).send('invalid todo')
  }
})

// PATCH
// Update a todo name for a given user

app.patch('/users/:userid/todo/:todoid', (req, res) => {
  const { todoid, userid } = req.params
  const { name } = req.body
  const isValidName = isValidTodo(name)
  const indexOfTodo = todos.findIndex(
    ({ id, userid: uid }) => id === todoid && +userid === uid
  )

  if (indexOfTodo === -1) {
    return res.status(403).send("Sorry couldn't find that todo")
  }

  if (isValidName) {
    const updatedTodos = todos.map(
      (t) =>
        t.id === todoid && t.userid === +userid ? { ...t, name } : { ...t } //what we are saying in this line??
    )

    todos = [...updatedTodos]
    return res.redirect(303, `/users/${userid}/todos`)
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
  const indexOfTodo = todos.findIndex(
    ({ id, userid: uid }) => id === todoid && +userid === uid
  )

  if (indexOfTodo === -1) {
    return res.status(403).send("Sorry couldn't find that todo")
  }
  if (isValid) {
    const updatedTodos = todos.map((t) =>
      t.id === todoid && t.userid === userid ? { ...t, complete } : { ...t }
    )

    todos = [...updatedTodos]
    return res.redirect(303, `/users/${userid}/todos`)
  } else {
    return res.status(400).send('invalid request')
  }
})

// DELETE
// Delete a todo for a given user

app.delete('/users/:userid/todo/:todoid', (req, res) => {
  const { userid, todoid } = req.params

  const indexOfTodo = todos.findIndex(
    ({ id, userid: uid }) => id === todoid && +userid === uid
  )

  if (indexOfTodo !== -1) {
    const updatedTodos = [...todos]

    updatedTodos.splice(indexOfTodo, 1)
    todos = [...updatedTodos]

    return res.redirect(303, `/users/${userid}/todos`)
  } else {
    return res.status(403).send('Sorry not able to delete todo')
  }
})

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
