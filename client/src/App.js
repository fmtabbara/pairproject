import React from 'react'
import './App.css'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom'
import { AuthProvider } from './global/auth/context'
import { Register } from './routes/register'
import { Login } from './routes/login'
import { CssBaseline } from '@material-ui/core'
import { Todos } from './routes/todos'
import { RegisterSuccess } from './routes/register-success'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/register-success">
              <RegisterSuccess />
            </Route>
            <Route path="/todos">
              <Todos />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route>
              <div>
                404 - Login <Link to="/login">here</Link>
              </div>
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
