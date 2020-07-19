import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Typography, Grid } from '@material-ui/core'
import { Page } from '../../components/page'
import { useTheme } from '@material-ui/styles'
import { AuthContext } from '../../global/auth/context'
import { useContext } from 'react'

export const RegisterSuccess = () => {
  const { hasRegistered } = useContext(AuthContext)
  const history = useHistory()
  const theme = useTheme()

  if (!hasRegistered) {
    history.push('/')
    return <div />
  } else {
    return (
      <Page>
        <Grid
          style={{
            margin: theme.spacing(15, 1, 1, 1),
          }}
          container
          direction="column"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Typography variant="h3">
              <span role="img" aria-label="tada-emoji">
                🎉
              </span>
              Welcome!
              <span role="img" aria-label="tada-emoji">
                🎉
              </span>
            </Typography>
          </Grid>
          <Grid>
            <Typography variant="h6">
              You can now login to your account <Link to="/login">here</Link>
            </Typography>
          </Grid>
        </Grid>
      </Page>
    )
  }
}
