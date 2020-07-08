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

export const Login = () => {
  const theme = useTheme()
  return (
    <Page>
      <Grid
        container
        direction="column"
        spacing={5}
        sm={8}
        alignItems="center"
        style={{ marginTop: theme.spacing(15) }}
      >
        <Grid item>
          <Typography variant="h5">Login</Typography>
        </Grid>
        <FormControl fullWidth>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <TextField
                label="username"
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item>
              <TextField
                label="password"
                type="password"
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item align="end">
              <Button variant="contained" size="small">
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
