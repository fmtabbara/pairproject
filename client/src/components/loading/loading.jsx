import React from 'react'
import { CircularProgress } from '@material-ui/core'

export const Loading = ({ size }) => (
  <CircularProgress size={size === 'small' ? 28 : 56} style={{ margin: 16 }} />
)
