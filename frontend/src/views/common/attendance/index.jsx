import React from 'react'
import Attendance from './Attendance'
import { useSelector } from 'react-redux'
import { authSelector } from '../../../store/slices/authSllice'

const index = () => {
  const {user} = useSelector(authSelector);
  return (
    <>
    <Attendance role={user?.role}/>
    </>
  )
}

export default index