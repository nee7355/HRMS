// import { lazy } from 'react';
// import { Navigate } from 'react-router-dom';

// // @project
// import Loadable from '@/components/Loadable';
// import MainLayout from '@/layouts/MainLayout';
// import ProtectedRoute from './ProtectedRoute';
// // import Login from '../views/auth/login';
// // import Register from '../views/auth/register';

// // Dashboard
// const DashboardPage = Loadable(lazy(() => import('@/views/pages/admin/dashboard')));

// const AttendancePage = Loadable(lazy(() => import('@/views/pages/admin/attendance')));
// const PayrollPage = Loadable(lazy(() => import('@/views/pages/admin/payroll')));
// const LeavePage = Loadable(lazy(() => import('@/views/pages/admin/leave')));
// const SettingsPage = Loadable(lazy(() => import('@/views/pages/admin/settings')));
// const DepartmentPage = Loadable(lazy(() => import('@/views/pages/admin/department')));
// const ReportsPage = Loadable(lazy(() => import('@/views/pages/admin/reports')));
// const EmployeesPage = Loadable(lazy(() => import('@/views/common/employees')));
// const LoginPage = Loadable(lazy(()=>import('@/views/pages/auth/login')));
// const RegisterPage = Loadable(lazy(()=>import('@/views/pages/auth/register')));

// const MainRoutes = [
//   {
//     path: '/login',
//     element: <LoginPage/>
//   },
//   {
//     path: '/register',
//     element: <RegisterPage/>
//   },
//   {
//   element: <ProtectedRoute/>,
//   children:[
//       {
  
//   path: '/',
//   element: <MainLayout />,
//   children: [
//     // { index: true, element: <Navigate to="/dashboard" replace /> },

//     { path: 'dashboard', element: <DashboardPage /> },
//     { path: 'attendance', element: <AttendancePage/> },
//     { path: 'payroll', element: <PayrollPage /> },
//     { path: 'employees', element: <EmployeesPage /> },
//     { path: 'settings', element: <SettingsPage /> },
//     { path: 'reports', element: <ReportsPage /> },
//     { path: 'leave', element: <LeavePage /> },
//     { path: 'departments', element: <DepartmentPage /> },
//   ]
// }
// ]
// }
// ];

// export default MainRoutes;
