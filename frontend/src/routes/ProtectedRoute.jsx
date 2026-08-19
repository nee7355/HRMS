import React from 'react'
import { isAuthenticated } from '../services/auth/auth'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {

  if(!isAuthenticated()) {
    return <Navigate to="/login" replace/>
  }

  return <Outlet/>
}

export default ProtectedRoute