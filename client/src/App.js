import React from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthProvider } from './global/auth/context'
import { Register } from './routes/register'
import { Login } from './routes/login'
import { CssBaseline } from '@material-ui/core'
import { useFetch } from './hooks/useFetch'

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
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
