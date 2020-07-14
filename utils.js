const { v4: uuid } = require('uuid')

function Todo({ user, name }) {
  this.id = uuid()
  this.name = name
  this.complete = false
  this.user = user
}

module.exports = { Todo }
