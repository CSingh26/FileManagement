import React, { useContext } from "react"
import { AuthContext } from "./authContext"
import { Navigate } from "react-router-dom"

const ProtectedRoutes = ({ children }) => {
    const { auth } = useContext(AuthContext)

    if (!auth) {
        return <Navigate to='/login' />
    }

    return children
}

export default ProtectedRoutes