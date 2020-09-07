import React, { useState } from 'react'

import clsx from 'clsx'
import {
  Card,
  CardContent,
  Checkbox,
  Typography,
  makeStyles,
  CardActions,
  Button,
  TextField,
  CardHeader,
  IconButton,
} from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'
import { Loading } from '../loading/loading'

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  checkbox: {
    '&:hover': {},
  },
  icon: {
    borderRadius: 30,
    width: 20,
    height: 20,
    boxShadow:
      'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#555',
    'input:hover ~ &': {
      backgroundColor: '#666',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 20,
      height: 20,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
}))

export const Todo = ({
  id,
  name,
  complete,
  onComplete,
  onDelete,
  onEdit,
  loading,
}) => {
  const classes = useStyles()
  const [editMode, setEditMode] = useState(false)
  const [editField, setEditField] = useState(name)
  return (
    <Card variant="outlined">
      <CardHeader
        title={
          editMode ? (
            <TextField
              autoFocus={editMode}
              value={editField}
              onChange={(e) => setEditField(e.target.value)}
            />
          ) : (
            <Typography
              style={
                complete ? { textDecoration: 'line-through', opacity: 0.3 } : {}
              }
              variant="h6"
            >
              {name}
            </Typography>
          )
        }
        avatar={
          <Checkbox
            onChange={(e) => onComplete(id, e.target.checked)}
            checked={complete}
            className={classes.checkbox}
            icon={<span className={classes.icon} />}
            checkedIcon={
              <span className={clsx(classes.icon, classes.checkedIcon)} />
            }
          />
        }
        action={
          <IconButton onClick={() => onDelete(id)}>
            <ClearIcon />
          </IconButton>
        }
      />
      {loading ? (
        <Loading size="small" />
      ) : (
        <CardContent className={classes.content}>
          {editMode ? (
            <div style={{ display: 'flex' }}>
              <Button
                onClick={() => {
                  setEditMode(false)
                  setEditField(name)
                }}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  onEdit(id, editField)
                  setEditMode(false)
                }}
              >
                Save
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => {
                setEditMode(true)
              }}
            >
              Edit
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  )
}

export default Todo
