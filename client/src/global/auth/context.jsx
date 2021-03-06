import React, { createContext } from 'react'
import { useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { useEffect } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('123')
  const [hasRegistered, setHasRegistered] = useState(false)
  const [currentUser, setCurrentUser] = useState('fmtabbara')

  const { results, fetch, error, loading } = useFetch()

  const handleLogin = async ({ username, password }) => {
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
  }

  useEffect(() => {
    if (results?.username && results?.token) {
      setCurrentUser(results.username)
      setToken(results.token)
    }
  }, [results])

  return (
    <AuthContext.Provider
      value={{
        token,
        handleLogin,
        error,
        loading,
        setHasRegistered,
        hasRegistered,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
