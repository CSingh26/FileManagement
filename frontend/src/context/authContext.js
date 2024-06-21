import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null)

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'))
    if (storedUserData) {
      setAuth(storedUserData)
    }
  }, [])

  const login = (token, userData) => {
    const storageUserData = {
      token, 
      user: userData
    }
    setAuth(storageUserData)
    localStorage.setItem('userData', JSON.stringify(storageUserData))
  }

  const logout = () => {
    setAuth(null)
    localStorage.removeItem('userData')
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}