import React, { createContext } from 'react'
import { useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { useEffect } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState()

  const { results, fetch, error, loading } = useFetch()

  const handleLogin = async ({ username, password }) => {
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
  }

  useEffect(() => console.log(results, error), [error])

  return (
    <AuthContext.Provider value={{ token, handleLogin }}>
      {children}
    </AuthContext.Provider>
  )
}
