import React from 'react'
import { getUser } from '@/services/auth/auth'
import AdminDashboard from '@/views/pages/admin/dashboard';
import HrDashboard from '@/views/pages/hr/dashboard';
import ManagerDashboard from '@/views/pages/manager/dashboard';
import UserDashboard from '@/views/pages/user/dashboard';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelector } from '../store/slices/authSllice';

const RoleDashboard = () => {
  const {user} = useSelector(authSelector)

//   const user = getUser();

  switch(user.role.name){
    case 'ADMIN':
        return <AdminDashboard/>;
    case 'HR':
        return <HrDashboard/>;
    case 'MANAGER':
        return <ManagerDashboard/>;
    case 'USER':
        return <UserDashboard/>;

    default:
        return <Navigate to='/unautherized' replace />
  }
}

export default RoleDashboard