const express = require('express')
const { Todo } = require('../utils')
const { isValidTodo, validComplete } = require('../validation')
const { db } = require('../db')

const todoRoutes = express.Router()

// GET
// Fetch all todos for a given user

todoRoutes.get('/:user', (req, res) => {
  const { user } = req.params
  db('todos')
    .where({
      user,
    })
    .then((results) => {
      if (results.length > 0) {
        return res.send(results.reverse())
      } else {
        return res.send('No todos')
      }
    })
    .catch((e) => console.log(e))
})

// GET
// Fetch single todo for a given user

todoRoutes.get('/:user/:todoid', (req, res) => {
  const { user, todoid } = req.params
  db('todos')
    .where({
      user,
      id: todoid,
    })
    .then((result) => {
      if (result.length !== 0) {
        return res.send(result)
      } else {
        return res.send('Nothing found')
      }
    })
    .catch((e) => res.send(e))
})

// POST
// Add a new todo for a given user

todoRoutes.post('/:user', (req, res) => {
  const { user } = req.params
  const { name } = req.body
  const isValid = isValidTodo(name)

  if (isValid) {
    const todo = new Todo({ user, name })
    db('todos')
      .insert(todo)
      .then((results) => {
        if (results === 0) {
          res.status(403).send('sorry todo not found')
        } else {
          res.redirect(303, `/todos/${user}/`)
        }
      })
  } else {
    return res.status(400).send('invalid todo')
  }
})

// PATCH
// Update a todo name for a given user

todoRoutes.patch('/:user/:todoid', (req, res) => {
  const { todoid, user } = req.params
  const { name } = req.body
  const isValidName = isValidTodo(name)

  if (isValidName) {
    db('todos')
      .update({ name })
      .where({
        user,
        id: todoid,
      })
      .then((results) => {
        if (results === 0) {
          res.status(403).send('Sorry todo not found')
        } else {
          res.redirect(303, `/todos/${user}`)
        }
      })
      .catch((e) => res.status(400).send(e))
  } else {
    return res.status(403).send('Sorry not able to update todo')
  }
})

// PATCH
// Update a todo with status for a given user

todoRoutes.patch('/:user/:todoid/complete', (req, res) => {
  const { todoid, user } = req.params
  const { complete } = req.body
  const isValid = validComplete(complete)

  if (isValid) {
    db('todos')
      .where({
        user,
        id: todoid,
      })
      .update({ complete }, ['complete', 'id'])
      .then(([results]) => {
        if (!results) {
          res.status(403).send('Sorry todo not found')
        } else {
          res.send(results)
        }
      })
      .catch((e) => res.status(400).send(e))
  } else {
    return res.status(403).send('Sorry not able to update todo')
  }
})

// DELETE
// Delete a todo for a given user

todoRoutes.delete('/:user/:todoid', (req, res) => {
  const { user, todoid } = req.params

  db('todos')
    .del()
    .where({
      user,
      id: todoid,
    })
    .then((result) => {
      if (result === 0) {
        return res.status(404).send('unable to delete todo')
      } else {
        res.send({ id: todoid })
      }
    })
    .catch((e) => res.send(e))
})

module.exports = { todoRoutes }
