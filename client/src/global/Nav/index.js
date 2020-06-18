import React, { useContext } from 'react'
import { AppBar, Toolbar, IconButton } from '@material-ui/core'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Brightness7Icon from '@material-ui/icons/Brightness7'

export const TopNav = () => {
  return (
    <AppBar position="sticky">
      <Toolbar></Toolbar>
    </AppBar>
  )
}
