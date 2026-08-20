import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// @project
import Loadable from '@/components/Loadable';
import MainLayout from '@/layouts/MainLayout';
import ProtectedRoute from './ProtectedRoute';
import Login from '../views/auth/login';
import Register from '../views/auth/register';

// Dashboard
const DashboardPage = Loadable(lazy(() => import('@/views/admin/dashboard')));

// Utils
const ColorPage = Loadable(lazy(() => import('@/views/components/utils/colors')));
const ShadowPage = Loadable(lazy(() => import('@/views/components/utils/shadow')));
const TypographyPage = Loadable(lazy(() => import('@/views/components/utils/typography')));

// Sample Page
const SamplePage = Loadable(lazy(() => import('@/views/admin/sample-page')));
const AttendancePage = Loadable(lazy(() => import('@/views/admin/attendance')));
const PayrollPage = Loadable(lazy(() => import('@/views/admin/payroll')));
const LeavePage = Loadable(lazy(() => import('@/views/admin/leave')));
const SettingsPage = Loadable(lazy(() => import('@/views/admin/settings')));
const DepartmentPage = Loadable(lazy(() => import('@/views/admin/department')));
const ReportsPage = Loadable(lazy(() => import('@/views/admin/reports')));
// const DepartmentPage = Loadable(lazy(() => import('@/views/admin/departments')));
const EmployeesPage = Loadable(lazy(() => import('@/views/common/employees')));
const LoginPage = Loadable(lazy(()=>import('../views/auth/login')));
const RegisterPage = Loadable(lazy(()=>import('../views/auth/register')));

const MainRoutes = [
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
  element: <ProtectedRoute/>,
  children:[
      {
  
  path: '/',
  element: <MainLayout />,
  children: [
    // { index: true, element: <Navigate to="/dashboard" replace /> },

    { path: 'dashboard', element: <DashboardPage /> },
    { path: 'attendance', element: <AttendancePage/> },
    { path: 'payroll', element: <PayrollPage /> },
    { path: 'employees', element: <EmployeesPage /> },
    { path: 'settings', element: <SettingsPage /> },
    { path: 'reports', element: <ReportsPage /> },
    { path: 'leave', element: <LeavePage /> },
    { path: 'departments', element: <DepartmentPage /> },
  ]
}
]
}
];

export default MainRoutes;
