import React from 'react'
import { getUser } from '@/services/auth/auth'
import AdminDashboard from '@/views/pages/admin';
import HrDashboard from '@/views/pages/hr/dashboard';
import ManagerDashboard from '@/views/pages/manager/dashboard';
import UserDashboard from '@/views/pages/user/dashboard';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelector } from '../store/slices/authSllice';
import ManagerLeave from '../views/pages/manager/leave/ManagerLeave';
import LeaveTest from '../views/common/leave/leave';

const RoleLeve = () => {
  const {user} = useSelector(authSelector)

//   const user = getUser();
        const role = user.role.name?user.role.name:user.role;

  switch(role){
    case 'ADMIN':
        return <LeaveTest/>;
    case 'HR':
        return <LeaveTest/>;
    case 'MANAGER':
        return <ManagerLeave/>;
    case 'USER':
        return <LeaveTest/>;

    default:
        return <Navigate to='/unautherized' replace />
  }
}

export default RoleLeve