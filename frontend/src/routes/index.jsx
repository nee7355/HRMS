import { createBrowserRouter } from 'react-router-dom';

// @routes
// import ProtectedRoute from '@/routes/ProtectedRoute';
// import adminRoutes from '@/routes/AdminRoutes';
// import hrRoutes from '@/routes/HrRoutes';
// import managerRoutes from '@/routes/ManagerRoutes';
// import userRoutes from '@/routes/UserRoutes';
import authRoutes from '@/routes/AuthRoutes';
import AppRoutes from './AppRoutes';


/***************************  ROUTING RENDER  ***************************/


const router = createBrowserRouter([
  ...authRoutes,
  ...AppRoutes

], {
  basename: import.meta.env.VITE_APP_BASE_URL
});

export default router;
