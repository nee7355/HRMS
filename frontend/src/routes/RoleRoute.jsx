import React from 'react'
import { getUser } from '../services/auth/auth'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelector } from '../store/slices/authSllice';

const RoleRoute = ({role=[], children}) => {
  const {user} = useSelector(authSelector)
  
  // const user = getUser();

  if(!user){
    return <Navigate to='/login' replace/>
  }

  if(!role.includes(user?.role.name)){
    return <Navigate to={'/unautherized'} replace />;
  }

  return children;
}

export default RoleRoute