
const isValidtodo = (todo) => {
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


module.exports = {
    isValidtodo
}