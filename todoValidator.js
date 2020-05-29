
const validation = (req, res) => {
    const { todo } = req.body;
    if ((todo === null) || (todos === undefined) || (0<len.todo>5)) {
    return res.status(400).json('incorrect todo')
}
else {
    res.json(todo)
}


module.exports = {
    validation
}