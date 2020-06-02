const express = require('express')
const bodyParser = require('body-parser')
const { v4: uuid } = require('uuid')
const { isValidTodo, validComplete } = require('./validation')

const app = express()
const PORT = 3000

app.use(bodyParser.json())

function Todo({ id, userid, name }) {
  this.id = id
  this.name = name
  this.complete = false
  this.userid = +userid
}

const users = [
  {
    id: 1,
    name: 'user_1',
  },
  {
    id: 2,
    name: 'user_2',
  },
  {
    id: 10,
    name: 'user_10',
  },
]

let todos = [
  {
    id: uuid(),
    name: 'tidy bedroom',
    complete: true,
    userid: 1,
  },
  {
    id: uuid(),
    name: 'tidy front room',
    complete: false,
    userid: 1,
  },
  {
    id: uuid(),
    name: 'complete routes for app',
    complete: false,
    userid: 1,
  },
  {
    id: uuid(),
    name: 'write validator function',
    complete: false,
    userid: 2,
  },
  {
    id: uuid(),
    name: 'learn how to write routes',
    complete: false,
    userid: 2,
  },
  {
    id: uuid(),
    name: 'go for a long walk',
    complete: false,
    userid: 3,
  },
]

// GET
// Fetch all todos for a given user

app.get('/users/:userid/todos', (req, res) => {
  const { userid } = req.params

  const matches = todos.filter(({ userid: id }) => id === +userid)

  if (matches.length > 0) {
    return res.send(matches)
  } else {
    return res.send('No todos')
  }
})

// POST
// Add a new todo for a given user

app.post('/users/:userid/todo', (req, res) => {
  const { userid } = req.params
  const name = req.body
  const isValid = isValidTodo(name)

  if (isValid) {
    const todo = new Todo({ userid, name, id: uuid() })
    todos.unshift(todo)
    return res.redirect(303, `/users/${userid}/todos`)
  } else {
    return res.status(400).send('invalid todo')
  }
})

// PATCH
// Update a todo with status for a given user

app.patch('/users/:userid/todo/:todoid/complete', (req, res) => {
  const { todoid, userid } = req.params
  const { complete } = req.body

  const validComplete = validComplete(complete)
  if (validComplete) {
    const updatedTodos = todos.map((t) =>
      t.id === todoid && t.userid === userid ? { ...t, complete } : { ...t }
    )

    todos = [...updatedTodos]
    return res.redirect(303, `/users/${userid}/todos`)
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

  if (isValidName) {
    const updatedTodos = todos.map((t) =>
      t.id === todoid && t.userid === userid ? { ...t, name } : { ...t }
    )

    todos = [...updatedTodos]
    return res.redirect(303, `/users/${userid}/todos`)
  } else {
    return res.status(403).send('Sorry not able to update todo')
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
