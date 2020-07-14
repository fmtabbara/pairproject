import React from 'react'
import { Container, makeStyles } from '@material-ui/core'

const usePageStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    background: theme.palette.background.paperDark,
    padding: 0,
  },
  content: {
    height: '100%',
    padding: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
  },
}))

export const Page = ({ children }) => {
  const classes = usePageStyles()
  return (
    <Container fixed maxWidth="sm" classes={{ root: classes.root }}>
      <Container className={classes.content}>{children}</Container>
    </Container>
  )
}
