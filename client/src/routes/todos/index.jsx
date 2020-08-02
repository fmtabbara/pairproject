import React, { useState, useEffect } from 'react'
import { Todo } from '../../components/Todo/Todo'
import { useContext } from 'react'
import { AuthContext } from '../../global/auth/context'
import { Link } from 'react-router-dom'
import { Loading } from '../../components/loading/loading'
import { Page } from '../../components/page'
import { useFetch } from '../../hooks/useFetch'
import {
  TextField,
  Button,
  FormControl,
  ThemeProvider,
} from '@material-ui/core'
import { useTheme } from '@material-ui/styles'

export const Todos = () => {
  const theme = useTheme()

  const { token, currentUser, onSignOut } = useContext(AuthContext)
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

  const addNewTodo = () => {
    if (newTodo.length > 0) {
      fetch(`/todos/${currentUser}`, {
        method: 'POST',
        body: JSON.stringify({ name: newTodo }),
      })
    }
    setNewTodo('')
  }

  const { results, error, loading, fetch } = useFetch()

  const { fetch: fetchComplete, results: completeResults } = useFetch()

  const { fetch: fetchDelete, results: deleteResults } = useFetch()

  const handleComplete = (id, complete) => {
    fetchComplete(`/todos/${currentUser}/${id}/complete`, {
      method: 'PATCH',
      body: JSON.stringify({ complete }),
    })
  }

  const handleDelete = (id) => {
    fetchDelete(`/todos/${currentUser}/${id}`, {
      method: 'DELETE',
    })
  }

  useEffect(() => {
    if (completeResults) {
      const updatedTodos = todos.map((todo) =>
        todo.id === completeResults.id
          ? { ...todo, complete: completeResults.complete }
          : todo
      )
      setTodos(updatedTodos)
    }
  }, [completeResults])

  useEffect(() => {
    if (deleteResults) {
      const updatedTodos = todos.filter((todo) => todo.id !== deleteResults.id)
      setTodos(updatedTodos)
    }
  }, [deleteResults])

  useEffect(() => {
    if (results) {
      setTodos([...results])
    }
  }, [results])

  useEffect(() => {
    if (currentUser) {
      fetch(`/todos/${currentUser}`)
    }
  }, [])

  return (
    <Page>
      {loading ? (
        <Loading />
      ) : token ? (
        <div
          style={{
            textAlign: 'center',
            width: '100%',
          }}
        >
          {todos.map((todo) => (
            <Todo
              onComplete={handleComplete}
              onDelete={handleDelete}
              id={todo.id}
              key={todo.id}
              name={todo.name}
              complete={todo.complete}
            />
          ))}
          <form onSubmit={addNewTodo}>
            <FormControl
              style={{
                margin: theme.spacing(0.5),
              }}
            >
              <TextField
                style={{
                  marginBottom: theme.spacing(1),
                }}
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                variant="outlined"
                size="small"
                autoFocus
              />
              <Button type="submit" onClick={addNewTodo}>
                Add
              </Button>
            </FormControl>
          </form>
          <Button onClick={onSignOut}>Log out</Button>
        </div>
      ) : (
        <div>
          You need to <Link to="/login">login</Link> to see your todos
        </div>
      )}
    </Page>
  )
}
