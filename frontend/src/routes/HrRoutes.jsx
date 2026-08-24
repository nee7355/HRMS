import Loadable from "@/components/Loadable"
import { lazy } from "react"

const LoginPage = Loadable(lazy(()=>import("@/views/pages/auth/login")));
const RegisterPage = Loadable(lazy(()=>import("@/views/pages/auth/register")));
const Layout = Loadable(lazy(()=>import("@/layouts/MainLayout/")));

const hrRoutes = [
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
                path: '/employees',
                element: <Layout/>
            },
            {
                path: '/departments',
                element: <Layout/>
            },
            {
                path: '/attendance',
                element: <Layout/>
            },
            {
                path: '/payroll',
                element: <Layout/>
            },
            {
                path: '/leave',
                element: <Layout/>
            },
            {
                path: '/performance',
                element: <Layout/>
            },
            {
                path: '/reports',
                element: <Layout/>
            },
        ]
    },
];


export default hrRoutes;