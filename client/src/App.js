import React, { useMemo, useState, createContext } from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthProvider } from './global/auth/context'
import { Register } from './routes/register'
import { Login } from './routes/login'
import { CssBaseline } from '@material-ui/core'

export const GlobalContext = createContext({})

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      paper: '#333',
    },
  },
})

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    background: {
      paper: '#fff',
    },
  },
})

const App = () => {
  const [darkMode, setDarkMode] = useState(true)

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <GlobalContext.Provider value={{ darkMode, setDarkMode }}>
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
      </GlobalContext.Provider>
    </ThemeProvider>
  )
}

export default App
