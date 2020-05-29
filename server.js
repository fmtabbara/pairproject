const express = require('express')
const bodyParser = require('body-parser')
const { v4: uuid } = require('uuid')

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
// ** Needs validation added **

app.get('/users/:userid/todos', (req, res) => {
  const { userid } = req.params

  const matches = todos.filter(({ userid: id }) => id === +userid)

  if (matches.length > 0) {
    res.send(matches)
  } else {
    res.send('No todos')
  }
})

// POST
// Add a new todo for a given user
// ** Needs validation added **

app.post('/users/:userid/todo', (req, res) => {
  const { userid } = req.params
  const name = req.body
  const todo = new Todo({ userid, name, id: uuid() })

  todos.unshift(todo)

  res.redirect(303, `/users/${userid}/todos`)
})

// PATCH
// Update a todo with status and/or name for a given user
// ** Needs validation added **

app.patch('/users/:userid/todo/:todoid', (req, res) => {
  const { todoid, userid } = req.params
  const { complete, name } = req.body

  const updatedTodos = todos.map((t) =>
    t.id === todoid ? { ...t, complete, name } : { ...t }
  )

  todos = [...updatedTodos]
  res.redirect(303, `/users/${userid}/todos`)
})

// DELETE
// Delete a todo for a given user
// ** Needs validation added **

app.delete('/users/:userid/todo/:todoid', (req, res) => {
  const { userid, todoid } = req.params

  const indexOfTodo = todos.findIndex(
    ({ id, userid: uid }) => id === todoid && +userid === uid
  )

  if (indexOfTodo !== -1) {
    const updatedTodos = [...todos]
    updatedTodos.splice(indexOfTodo, 1)
    todos = [...updatedTodos]
    res.redirect(303, `/users/${userid}/todos`)
  } else {
    res.status(403).send('Sorry not able to delete todo')
  }
})

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
