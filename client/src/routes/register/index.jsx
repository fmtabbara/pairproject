import React, { useState } from 'react'
import { useTheme } from '@material-ui/styles'
import {
  Grid,
  Typography,
  FormControl,
  TextField,
  Button,
  FormHelperText,
} from '@material-ui/core'

import { Page } from '../../components/page'
import { Loading } from '../../components/loading/loading'

import { useFetch } from '../../hooks/useFetch'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export const Register = ({ withConfirmPassword }) => {
  const { fetch, loading, error: fetchError } = useFetch()
  const theme = useTheme()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState()

  useEffect(() => {
    setError(fetchError)
  }, [fetchError])

  const onRegister = ({ username, password }) => {
    fetch('/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
  }

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
          <Typography variant="h4">Register</Typography>
        </Grid>
        {loading && <Loading />}
        {!loading && (
          <form
            onSubmit={() => onRegister({ username, password })}
            style={{ width: '100%' }}
          >
            <FormControl fullWidth onSubmit={onRegister}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    autoFocus
                    label="username"
                    fullWidth
                    variant="outlined"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    helperText={
                      error?.username
                        ? 'username must be between 3 and 20 characters'
                        : error?.userExists
                        ? 'The username already exists 😢 Try a different one'
                        : ''
                    }
                    error={error?.username || error?.userExists}
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
                    helperText={
                      error?.password &&
                      'password must be between 8 and 20 characters'
                    }
                    error={error?.password}
                  />
                </Grid>
                {withConfirmPassword && (
                  <Grid item>
                    <TextField
                      label="confirm password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                      helperText={
                        confirmPassword.length > 0 &&
                        password !== confirmPassword &&
                        'passwords do not match'
                      }
                      error={
                        confirmPassword.length > 0 &&
                        password !== confirmPassword
                      }
                    />
                  </Grid>
                )}
                <Grid item align="end">
                  <Button type="submit" variant="contained" size="small">
                    Register
                  </Button>
                </Grid>
              </Grid>
              <FormHelperText id="my-helper-text">
                Login <Link to="/login">here</Link>.
              </FormHelperText>
            </FormControl>
          </form>
        )}
      </Grid>
    </Page>
  )
}
