import Loadable from "@/components/Loadable"
import { lazy } from "react"

const LoginPage = Loadable(lazy(()=>import("@/views/pages/auth/login")));
const RegisterPage = Loadable(lazy(()=>import("@/views/pages/auth/register")));
const UnauthorizedPage = Loadable(lazy(()=>import("@/views/pages/auth/Unauthorized")));
const Layout = Loadable(lazy(()=>import("@/layouts/MainLayout/")));
const ProtectedRoute = Loadable(lazy(()=>import("@/routes/ProtectedRoute")))

const authRoutes = [
    {
        path: '/login',
        element: <LoginPage/>
    },
    {
        path: '/register',
        element: <RegisterPage/>
    },
    {
        path: "/unauthorized",
        element: <UnauthorizedPage />
    }
    
];


export default authRoutes;