import React from 'react'
import { getUser } from '../services/auth/auth'
import { Navigate } from 'react-router-dom';

const RoleRoute = ({role=[], children}) => {
  const user = getUser();

  if(!user){
    return <Navigate to='/login' replace/>
  }

  if(!role.includes(user?.role)){
    return <Navigate to={'/unautherized'} replace />;
  }

  return children;
}

export default RoleRoute