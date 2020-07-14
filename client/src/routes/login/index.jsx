import React, { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Typography,
  FormControl,
  TextField,
  FormHelperText,
  Grid,
  Button,
  useTheme,
} from '@material-ui/core'
import { Loader } from '../../components/loader/loader'
import { AuthContext } from '../../global/auth/context'
import { Page } from '../../components/page'

export const Login = () => {
  const theme = useTheme()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { handleLogin, loading, error, token } = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  useEffect(() => (token ? console.log("YOU'RE IN!") : undefined), [token])

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
        {loading && <Loader />}
        {!loading && (
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <FormControl fullWidth onSubmit={handleSubmit}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    label="username"
                    fullWidth
                    variant="outlined"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
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
                  />
                </Grid>
                <Grid item align="end">
                  <Button type="submit" variant="contained" size="small">
                    Go
                  </Button>
                </Grid>
              </Grid>
              <FormHelperText id="my-helper-text">
                Login or register <Link to="/register">here</Link>.
              </FormHelperText>
            </FormControl>
          </form>
        )}
      </Grid>
    </Page>
  )
}
