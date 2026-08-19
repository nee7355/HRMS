import { Outlet } from 'react-router-dom';

// @mui
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import LogoMain from '@/components/logo/LogoMain';
import GetImagePath from '@/utils/GetImagePath';

// @assets
// import dashboardLightIcon from '@/assets/images/graphics/hosting/dashboard-light.svg';
// import dashboardDarkIcon from '@/assets/images/graphics/hosting/dashboard-dark.svg';

// const dashBoardImage = { light: dashboardLightIcon, dark: dashboardDarkIcon };

/***************************  AUTH LAYOUT  ***************************/

export default function AuthLayout() {
  return (
    <Grid container sx={{height: '100vh', display:'flex', justifyContent:'center', alignItems: 'center'}}>
      <Grid size={{ xs: 12, md: 6, lg: 7 }} sx={{ p: { xs: 3, sm: 7 } }}>
        <Outlet />
      </Grid>
    </Grid>
  );
}
