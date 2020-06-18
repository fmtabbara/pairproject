import React, { createContext } from 'react'
import { useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('token')

  return (
    <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>
  )
}
