import React, { useContext } from 'react'
import { AppBar, Toolbar, IconButton } from '@material-ui/core'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import { GlobalContext } from '../../App'

export const TopNav = () => {
  const { darkMode, setDarkMode } = useContext(GlobalContext)

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton>
          {darkMode ? (
            <Brightness7Icon onClick={() => setDarkMode(false)} />
          ) : (
            <Brightness4Icon onClick={() => setDarkMode(true)} />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
