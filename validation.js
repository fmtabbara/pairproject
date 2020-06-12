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

const isValidCredentials = ({ username, password }) => {
  const response = { isValid: true, errors: [] }
  if (
    username === undefined ||
    username === null ||
    username.length < 3 ||
    username.length > 20
  ) {
    response.isValid = false
    response.errors.push(
      'Please enter a username between 3 and 20 characters long'
    )
  }
  if (
    password === undefined ||
    password === null ||
    password.length < 8 ||
    password.length > 20
  ) {
    response.isValid = false
    response.errors.push(
      'Please enter a password between 8 and 20 characters long'
    )
  }

  return response
}

module.exports = {
  isValidTodo,
  validComplete,
  isValidCredentials,
}
