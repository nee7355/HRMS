import React from 'react'
import { getUser, isAuthenticated } from '../services/auth/auth'
import { Navigate, Outlet } from 'react-router-dom'
import { userSelector } from '../store/slices/userSlice'
import {useSelector} from 'react-redux'
import { authSelector } from '../store/slices/authSllice'

const ProtectedRoute = ({}) => {
  const {isAuthenticated, authLoader} = useSelector(authSelector)

  if (authLoader) {
    return <div>Loading...</div>;
  }
 

  if(!isAuthenticated) {
    return <Navigate to="/login" replace/>
  }

  // const user = getUser();
  // const userRole = user?.role;
  
  // if(allowedRoles?.length>0 && !allowedRoles.includes(userRole)){
  //   return <Navigate to = "/unautherized" replace />;
  // }

  // if(!user){
  //   return <Navigate to="/login" replace/>
  // }

  return <Outlet/>
}

export default ProtectedRoute