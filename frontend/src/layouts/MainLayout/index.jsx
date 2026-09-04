import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @project
import Drawer from './Drawer';
import Header from './Header';
import { handlerDrawerOpen, useGetMenuMaster } from '@/services/states/menu';
import Breadcrumbs from '@/components/Breadcrumbs';
import Loader from '@/components/Loader';

import { DRAWER_WIDTH } from '@/config';
import { useMemo } from 'react';
import { usePathname, useRouter } from '../../utils/navigation';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../../store/slices/authSllice';

/***************************  ADMIN LAYOUT  ***************************/

export default function Layout() {
  const { menuMasterLoading } = useGetMenuMaster();

  const downXL = useMediaQuery((theme) => theme.breakpoints.down('xl'));
  const currentPath = usePathname();
  const router = useRouter();

  const dispatch = useDispatch();
  const dashboardHeader = useMemo(()=>{
    if(currentPath === '/dashboard') return <Header/>
    return <></>
  },[currentPath])

  useEffect(()=>{
    if(currentPath==='/'){
      router.push('/dashboard')
    }
  },[currentPath]);
  useEffect(() => {
    handlerDrawerOpen(!downXL);
  }, [downXL]);

  // useEffect(()=>{
  //   dispatch(checkAuth())
  // },[])


  if (menuMasterLoading) return <Loader />;

  return (
    <Stack direction="row" sx={{ width: 1 }}>
      {/* <Header /> */}
      {dashboardHeader}
      <Drawer />
      <Box component="main" sx={{ width: `calc(100% - ${DRAWER_WIDTH}px)`, flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        {currentPath === '/dashboard'&&<Toolbar sx={{ minHeight: { xs: 54, sm: 46, md: 76 } }} />}
        <Box
          sx={{
            py: 0.4,
            px: 1.5,
            mx: { xs: -2, sm: -3 },
            display: { xs: 'block', md: 'none' },
            borderBottom: 1,
            borderColor: 'divider',
            mb: 2
          }}
        >
          <Breadcrumbs />
        </Box>
        <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 } }}>
          <Outlet />
        </Container>
      </Box>
    </Stack>
  );
}
