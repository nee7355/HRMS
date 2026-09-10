import React from 'react'
import ProtectedRoute from './ProtectedRoute'
import Layout from '../layouts/MainLayout'
import RoleDashboard from './RoleDashboard'
import RoleRoute from './RoleRoute'
import Employee from '../views/common/employees'
import Attendance from '../views/common/attendance'
import Payroll from '../views/pages/Payroll'
import Leave from '../views/common/leave'
import Department from '../views/pages/admin/department'
import Box from '@mui/material/Box'
import Team from '../views/pages/manager/team'
import Performance from '../views/pages/manager/performance'
import Designation from '../views/pages/admin/Designation'

const AppRoutes = [
    {
        element: <ProtectedRoute/>,
        children: [
            {
                path: '/',
                element: <Layout/>,
                children: [
                    {
                        path: '/dashboard',
                        // element: <Box>Dashboard is rendering</Box>
                        element: <RoleDashboard/>
                    },
                    {
                        path: '/employees',
                        element: (
                            <RoleRoute role={['ADMIN', 'HR', 'MANAGER']}>
                                <Employee/>
                            </RoleRoute>
                        )
                    },
                    {
                        path: '/attendance',
                        element: (
                            <RoleRoute role={['ADMIN', 'HR', 'MANAGER', 'USER']}>
                                <Attendance/>
                            </RoleRoute>
                        )
                    },
                    {
                        path: '/payroll',
                        element: (
                            <RoleRoute role={['ADMIN', 'HR', 'MANAGER']}>
                                <Payroll/>
                            </RoleRoute>
                        )
                    },
                    {
                        path: '/leave',
                        element: (
                            <RoleRoute role={['ADMIN', 'HR', 'MANAGER', 'USER']}>
                                <Leave/>
                            </RoleRoute>
                        )
                    },
                    {
                        path: '/departments',
                        element: (
                            <RoleRoute role={['ADMIN', 'HR']}>
                                <Department/>
                            </RoleRoute>
                        )
                    },
                    {
                        path: '/designation',
                        element: (
                            <RoleRoute role={['ADMIN']}>
                                <Designation/>
                            </RoleRoute>
                        )
                    },
                    {
                        path: '/reports',
                        element: (
                            <RoleRoute role={['ADMIN', 'HR', 'MANAGER']}>
                                <Department/>
                            </RoleRoute>
                        )
                    },
                    {
                        path: '/team',
                        element: (
                            <RoleRoute role={['MANAGER']}>
                                <Team/>
                            </RoleRoute>
                        )
                    },
                    {
                        path: '/performance',
                        element: (
                            <RoleRoute role={['MANAGER']}>
                                <Performance/>
                            </RoleRoute>
                        )
                    },
                    {
                        path: '/settings',
                        element: (
                            <RoleRoute role={['ADMIN']}>
                                <Department/>
                            </RoleRoute>
                        )
                    },

                ]
            }
        ]
    }
]

export default AppRoutes