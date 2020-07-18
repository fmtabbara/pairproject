import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Grid } from '@material-ui/core'
import { Page } from '../../components/page'
import { useTheme } from '@material-ui/styles'

export const RegisterSuccess = () => {
  const theme = useTheme()
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
          <Typography variant="h3">🎉Welcome!🎉</Typography>
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
