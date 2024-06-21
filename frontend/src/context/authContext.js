import React, { createContext, useState, useEffect } from 'react'
import server from '../utils/axios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null)

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'))
    if (storedUserData) {
      setAuth(storedUserData)
    }
  }, [])

  const login = (userData) => {
    const storageUserData = {
      user: userData
    }
    setAuth(storageUserData)
    localStorage.setItem('userData', JSON.stringify(storageUserData))
  }

  const logout = async () => {
    try {
      await server.post('/logout')
      setAuth(null)
      localStorage.removeItem('userData')
    } catch (err) {
      console.error('Error logging out', err)
    }
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}