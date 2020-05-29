const express = require('express')
const bodyParser = require('body-parser')
const { v4: uuid } = require('uuid')
const todoValidator = require('./todoValidator')

const app = express()
const PORT = 3000

app.use(bodyParser.json())

app.get('/todos', (req, res) => res.send('list of todos'))

app.post('/validation', (req, res) => {todoValidator.validation(req, res)})

app.post('/addtodo', (req, res) => {
  const todo = req.body
  todo.id = uuid()
  res.send(todo)
})
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
