import React, { useEffect, useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  Typography,
  FormControl,
  TextField,
  FormHelperText,
  Grid,
  Button,
  useTheme,
} from '@material-ui/core'
import { Loading } from '../../components/loading/loading'
import { AuthContext } from '../../global/auth/context'
import { Page } from '../../components/page'

export const Login = () => {
  const theme = useTheme()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState()
  const [passwordError, setPasswordError] = useState()

  const history = useHistory()

  const { handleLogin, loading, error, token } = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    handleLogin({ username, password })
  }

  useEffect(() => (token ? history.push('/todos') : undefined), [token])

  useEffect(() => {
    if (error === 'Not Found') {
      setUsernameError(true)
    } else {
      setUsernameError(false)
    }

    if (error === 'Unauthorized') {
      setPasswordError(true)
    } else {
      setPasswordError(false)
    }
  }, [error])

  return (
    <Page>
      <Grid
        container
        direction="column"
        spacing={5}
        alignItems="center"
        style={{
          maxWidth: 375,
          margin: theme.spacing(15, 1, 1, 1),
        }}
      >
        <Grid item>
          <Typography variant="h4">Login</Typography>
        </Grid>
        {loading && <Loading />}
        {!loading && (
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <FormControl fullWidth onSubmit={handleSubmit}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    autoFocus
                    label="username"
                    fullWidth
                    variant="outlined"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    helperText={usernameError && 'username not found'}
                    error={usernameError}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    helperText={passwordError && 'incorrect password'}
                    error={passwordError}
                  />
                </Grid>
                <Grid item align="end">
                  <Button type="submit" variant="contained" size="small">
                    Go
                  </Button>
                </Grid>
              </Grid>
              <FormHelperText id="my-helper-text">
                Register <Link to="/register">here</Link>
              </FormHelperText>
            </FormControl>
          </form>
        )}
      </Grid>
    </Page>
  )
}
