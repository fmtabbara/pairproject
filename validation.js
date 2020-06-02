const isValidTodo = (todo) => {
  if (
    typeof todo !== 'string' ||
    todo === null ||
    todo === undefined ||
    todo.length === 0 ||
    todo.length > 100
  ) {
    return false
  } else {
    return true
  }
}

const validComplete = (complete) =>
  typeof complete === 'boolean' ? true : false

module.exports = {
  isValidTodo,
  validComplete,
}
