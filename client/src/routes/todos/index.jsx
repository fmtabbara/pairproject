import React, { useState } from 'react'
import { Todo } from '../../components/Todo/Todo'

export const Todos = () => {
  const initialState = [
    {
      name: 'todo1',
      description: 'coding',
      complete: false,
    },
    {
      name: 'todo2',
      description: 'reading',
      complete: false,
    },
    {
      name: 'todo3',
      description: 'jogging',
      complete: false,
    },
  ]

  const [todos, setTodos] = useState(initialState)
  const [newTodo, setNewTodo] = useState('')

  const addNewTodo = () => {
    const newArray = [
      ...todos,
      { description: newTodo, name: newTodo, complete: false },
    ]
    setTodos(newArray)
    setNewTodo('')
  }
  return (
    <div className="App">
      {todos.map((todo, index) => (
        <Todo
          key={index}
          name={todo.name}
          description={todo.description}
          complete={false}
        />
      ))}
      <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
      <button onClick={addNewTodo}>Add new todo</button>
    </div>
  )
}
