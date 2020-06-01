
const isValidTodo = (todo) => {
    if (
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

const validPatch = (todo) => {
    if (!todo === Boolean) 
  { return false 
} else {
    return true
}
}


module.exports = {
    isValidTodo,
    validPatch
}