require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const { todoRoutes } = require('./routes/todoRoutes')
const { baseRoutes } = require('./routes/baseRoutes')

const app = express()

const PORT = process.env.PORT || 3001

app.use(bodyParser.json())

// User Routes

app.use('/todos', todoRoutes)
app.use('/', baseRoutes)

// Fallback route

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
