import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../global/auth/context'
import { Link } from 'react-router-dom'

export const Todos = () => {
  const { token } = useContext(AuthContext)

  return token ? (
    <h1>Todos</h1>
  ) : (
    <div>
      You need to <Link to="/login">login</Link> to see your todos
    </div>
  )
}
