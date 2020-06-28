import React from 'react'
import { Container, makeStyles } from '@material-ui/core'
import { TopNav } from '../../global/Nav'

const usePageStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    background: theme.palette.background.paperDark,
    padding: 0,
  },
  content: {
    padding: theme.spacing(3),
  },
}))

export const Page = ({ children }) => {
  const classes = usePageStyles()
  return (
    <Container fixed maxWidth="sm" classes={{ root: classes.root }}>
      <TopNav />
      <Container className={classes.content}>{children}</Container>
    </Container>
  )
}
