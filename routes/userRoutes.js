const express = require('express')
const { Todo } = require('../utils')
const { isValidTodo, validComplete } = require('../validation')
const { db } = require('../db')

const userRoutes = express.Router()

// GET
// Fetch all todos for a given user

userRoutes.get('/:userid/todos', (req, res) => {
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

userRoutes.get('/:userid/todo/:todoid', (req, res) => {
  const { userid, todoid } = req.params
  db('todos')
    .where({
      userid: +userid,
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

userRoutes.post('/:userid/todo', (req, res) => {
  const { userid } = req.params
  const { name } = req.body
  const isValid = isValidTodo(name)
  if (isValid) {
    const todo = new Todo({ userid, name })
    db('todos')
      .insert(todo)
      .then((results) => {
        if (results === 0) {
          res.status(403).send('sorry todo not found')
        } else {
          res.redirect(303, `/users/${userid}/todos`)
        }
      })
  } else {
    return res.status(400).send('invalid todo')
  }
})

// PATCH
// Update a todo name for a given user

userRoutes.patch('/:userid/todo/:todoid', (req, res) => {
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

userRoutes.patch('/:userid/todo/:todoid/complete', (req, res) => {
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

userRoutes.delete('/:userid/todo/:todoid', (req, res) => {
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

module.exports = { userRoutes }
