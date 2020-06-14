const { v4: uuid } = require('uuid')

function Todo({ userid, name }) {
  this.id = uuid()
  this.name = name
  this.complete = false
  this.userid = +userid
}

module.exports = { Todo }
