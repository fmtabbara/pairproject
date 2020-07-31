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
  Checkbox,
} from '@material-ui/core'
import { useTheme } from '@material-ui/styles'

export const Todos = () => {
  const theme = useTheme()

  const { token, currentUser } = useContext(AuthContext)
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [todos, isComplete] = useState([])

  const addNewTodo = () => {
    fetch(`/todos/${currentUser}`, {
      method: 'POST',
      body: JSON.stringify({ name: newTodo }),
    })
    setNewTodo('')
  }

  const { results, error, loading, fetch } = useFetch()

  useEffect(() => {
    if (results) {
      setTodos([...results])
    }
  }, [results])
  console.log(results)

  useEffect(() => {
    if (currentUser) {
      fetch(`/todos/${currentUser}/complete`)
    }
  }, [])

  // this is added:

  const handleOnChange = (e) => {
    const isComplete = () =>
      fetch('todos/${currentUser}', {
        method: 'PATCH',
        body: JSON.stringify({ complete: true }),
      })

    const { results, onChange, loading, fetch } = useFetch()

    useEffect(() => {
      if (isComplete) {
        setTodos([...results])  , //need to change this to get an array back without completed todos. (remove the completed todo from the list)
      }
    }, [results])
    console.log(results)

    useEffect(() => {
      if (currentUser) {
        fetch(`/todos/${currentUser}/complete`)
      }
    }, [])

    // above added

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
              />
              <Button onClick={addNewTodo}>Add</Button>
            </FormControl>
          </div>
        ) : (
          <div>
            You need to <Link to="/login">login</Link> to see your todos
          </div>
        )}
      </Page>
    )
  }
}
