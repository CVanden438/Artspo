import { useAuthContext } from '../firebase/auth'
import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthContext()
  if (loading) {
    return <p>Loading...</p>
  }
  if (!user) {
    return <Navigate to='/browse' />
  }
  return children
}

export default ProtectedRoute
