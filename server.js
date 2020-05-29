const express = require('express')
const bodyParser = require('body-parser')
const { v4: uuid } = require('uuid')
const { isValidTodo } = require('./validation')

const app = express()
const PORT = 3000

app.use(bodyParser.json())

app.get('/todos', (req, res) => res.send('list of todos'))

app.post('/addtodo', (req, res) => {
  const todo = req.body
  const isValid = isValidTodo(todo.name)

  if (isValid) {
  todo.id = uuid()
  return res.send(todo)
} else {
return res.status(400).send('invalid todo')
}
})


app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
