import Loadable from "@/components/Loadable"
import { lazy } from "react"

const LoginPage = Loadable(lazy(()=>import("@/views/pages/auth/login")));
const RegisterPage = Loadable(lazy(()=>import("@/views/pages/auth/register")));
const Layout = Loadable(lazy(()=>import("@/layouts/MainLayout/")));

const managerRoutes = [
    {
        path: '/login',
        element: <LoginPage/>
    },
    {
        path: '/register',
        element: <RegisterPage/>
    },
    {
        element: '',
        children: [
            {
                path: '/',
                element: <Layout/>
            },
            {
                path: '/dashboard',
                element: <Layout/>
            },
            {
                path: '/profile',
                element: <Layout/>
            },
            {
                path: '/attendance',
                element: <Layout/>
            },
            {
                path: '/leave',
                element: <Layout/>
            },
            {
                path: '/payslip',
                element: <Layout/>
            },
        ]
    },
];

export default managerRoutes;