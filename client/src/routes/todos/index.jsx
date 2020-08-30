import React, { useState, useEffect } from 'react'
import { Todo } from '../../components/Todo/Todo'
import { useContext } from 'react'
import { AuthContext } from '../../global/auth/context'
import { Link } from 'react-router-dom'
import { Loading } from '../../components/loading/loading'
import { Page } from '../../components/page'
import { useFetch } from '../../hooks/useFetch'
import { TextField, Button, FormControl } from '@material-ui/core'
import { useTheme } from '@material-ui/styles'

export const Todos = () => {
  const theme = useTheme()

  const { token, currentUser } = useContext(AuthContext)
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

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
    }
  }, [completeResults])

  // useFetch is going to return the function we need to make a request and also the results from that request
  // I added results: deleteResults

  const { fetch: fetchDelete, results: deleteResults } = useFetch()

  const handleDelete = (id) => {
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

      const index = todos.findIndex((a) => a.id === deleteResults)
      const temp = [...todos]
      // splice directly malipulates an array (it doesnt return a new one) so we create a new array from our todos array and use splice on that
      temp.splice(index, 1)
      setTodos(temp)
    }
  }, [deleteResults])

  return (
    <Page>
      {loading ? (
        <Loading />
      ) : token ? (
        <div className="App">
          {todos.map((todo) => (
            <Todo
              onDelete={handleDelete}
              onComplete={handleComplete}
              id={todo.id}
              key={todo.id}
              name={todo.name}
              description={todo.name}
              complete={todo.complete}
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
