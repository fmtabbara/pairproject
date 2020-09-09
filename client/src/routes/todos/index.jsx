import React, { useState, useEffect } from 'react'
import { Todo } from '../../components/Todo/Todo'
import { useContext } from 'react'
import { AuthContext } from '../../global/auth/context'
import { Link } from 'react-router-dom'
import { Loading } from '../../components/loading/loading'
import { Page } from '../../components/page'
import { useFetch } from '../../hooks/useFetch'
import { TextField, Button, FormControl, Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/styles'

const LoadWithQuote = React.memo(() => {
  const quotes = [
    'Warp Speed!',
    'Full steam ahead!',
    "Let's do this!",
    "Let's get ready to rumble!",
    'Pedal to the metal',
  ]
  const randomNumber = Math.ceil(Math.random() * quotes.length - 1)

  return (
    <>
      <Loading />
      <Typography variant="h4">{quotes[randomNumber]}</Typography>
    </>
  )
})

export const Todos = () => {
  const theme = useTheme()

  const { token, currentUser } = useContext(AuthContext)
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [todosLoading, setTodosLoading] = useState([])

  const handleAddLoadingTodos = (todoId) =>
    setTodosLoading((ids) => [...ids, todoId])

  const handleRemoveTodosLoading = (todoId) =>
    setTodosLoading((ids) => ids.filter((id) => todoId !== id))

  const addNewTodo = () => {
    fetch(`/todos/${currentUser}`, {
      method: 'POST',
      body: JSON.stringify({ name: newTodo }),
    })
    setNewTodo('')
  }

  const { results, loading, fetch } = useFetch()

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

  const { fetch: fetchComplete, results: completeResults } = useFetch()

  const handleComplete = (id, complete) => {
    handleAddLoadingTodos(id)
    fetchComplete(`/todos/${currentUser}/${id}/complete`, {
      method: 'PATCH',
      body: JSON.stringify({ complete }),
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
      handleRemoveTodosLoading(completeResults.id)
    }
  }, [completeResults])

  // useFetch is going to return the function we need to make a request and also the results from that request
  // I added results: deleteResults

  const { fetch: fetchDelete, results: deleteResults } = useFetch()

  const handleDelete = (id) => {
    handleAddLoadingTodos(id)
    fetchDelete(`/todos/${currentUser}/${id}`, {
      method: 'DELETE',
    })
  }

  // we use useEffect to response to something that changes
  // in this case we want to do something when we get back the deleteResults'
  // deleteResults goes in the dependancy array of useEffect because that if what we are waiting on changes for
  // deleteResults starts as undefined and when the server responds to our request to delete a todo deleteResults becomes
  // the response which should be in the form {id: exampleId123}

  useEffect(() => {
    if (deleteResults) {
      // if delete result is not undefined then run what's inside the if statement
      const temp = todos.filter((a) => a.id !== deleteResults.id)
      setTodos(temp)
      handleRemoveTodosLoading(deleteResults.id)
    }
  }, [deleteResults])

  // this code is for editing a todo:

  const { fetch: fetchEdit, results: editResults } = useFetch()

  const handleEdit = (id, name) => {
    handleAddLoadingTodos(id)
    fetchEdit(`/todos/${currentUser}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ name }),
    })
  }

  useEffect(() => {
    if (editResults) {
      const editTodos = todos.map((todo) =>
        todo.id === editResults.id ? { ...todo, ...editResults } : todo
      )
      setTodos(editTodos)
      handleRemoveTodosLoading(editResults.id)
    }
  }, [editResults])

  return (
    <Page>
      {loading ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LoadWithQuote />
        </div>
      ) : token ? (
        <div className="App">
          {todos.map((todo) => (
            <Todo
              onEdit={handleEdit}
              onDelete={handleDelete}
              onComplete={handleComplete}
              id={todo.id}
              key={todo.id}
              name={todo.name}
              description={todo.name}
              complete={todo.complete}
              loading={todosLoading.includes(todo.id)}
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
