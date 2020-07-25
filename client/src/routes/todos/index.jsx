import React, { useState, useEffect } from 'react'
import { Todo } from '../../components/Todo/Todo'
import { useContext } from 'react'
import { AuthContext } from '../../global/auth/context'
import { Link } from 'react-router-dom'
import { Loading } from '../../components/loading/loading'
import { Page } from '../../components/page'
import { useFetch } from '../../hooks/useFetch'

export const Todos = () => {
  const { token } = useContext(AuthContext)
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

  const addNewTodo = () => {
    fetch('/todos/ali@gmail.com', {
      method: 'POST',
      body: JSON.stringify({ name: newTodo }),
    })
    setNewTodo('')
  }

  const { results = [], error, loading, fetch } = useFetch()
  useEffect(() => {
    setTodos([...results])
  }, [results])

  useEffect(() => {
    fetch('/todos/ali@gmail.com')
  }, [])

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
              description={todo.name}
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
