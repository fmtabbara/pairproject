import React, { useState } from 'react'
import { Todo } from '../../components/Todo/Todo'
import { useContext } from 'react'
import { AuthContext } from '../../global/auth/context'
import { Link } from 'react-router-dom'
import { Loading } from '../../components/loading/loading'
import { Page } from '../../components/page'

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

export const Todos = () => {
  const { token } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
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

  setTimeout(() => setLoading(false), 1000)

  return (
    <Page>
      {loading ? (
        <Loading />
      ) : token ? (
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
      ) : (
        <div>
          You need to <Link to="/login">login</Link> to see your todos
        </div>
      )}
    </Page>
  )
}
