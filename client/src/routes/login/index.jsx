import React from 'react'
import { Page } from '../../components/page'
import {
  Typography,
  FormControl,
  TextField,
  FormHelperText,
  Grid,
  Button,
  useTheme,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export const Login = () => {
  const theme = useTheme()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    console.log({ username, password })
    setUsername('')
    setPassword('')
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
          <Typography variant="h4">Login</Typography>
        </Grid>
        <FormControl fullWidth>
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
              <Button variant="contained" size="small" onClick={handleSubmit}>
                Go
              </Button>
            </Grid>
          </Grid>
          <FormHelperText id="my-helper-text">
            Login or register <Link to="/register">here</Link>.
          </FormHelperText>
        </FormControl>
      </Grid>
    </Page>
  )
}
