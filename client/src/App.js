import React from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
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
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
