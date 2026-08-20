// @mui
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @project
import Notification from './Notification';
import Profile from './Profile';
import SearchBar from './SearchBar';
import ThemeModeSwitcher from './ThemeModeSwitcher';
import Breadcrumbs from '@/components/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { usePathname } from '../../../../utils/navigation';
import { useMemo } from 'react';

/***************************  HEADER CONTENT  ***************************/

export default function HeaderContent() {
  const path = usePathname();
 
  const header = useMemo(()=>{
    const p = path.split("/").filter(item=>item);
    const formated =  `${p[0].slice(0, 1).toUpperCase()}${p[0].slice(1)}`
    return formated;
  },[path]);

  return (
    <>
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: { xs: 'flex-end', md: 'space-between' }, gap: 2, width: 1 }}>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          {/* <Breadcrumbs /> */}
          <Typography component={"h1"} sx={{fontWeight: 'bold', fontSize: '22px'}}>{header}</Typography>
        </Box>
        <Stack direction="row" sx={{ alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
          <SearchBar />
          <ThemeModeSwitcher />
          <Notification />
          {/* <Profile /> */}
        </Stack>
      </Stack>
    </>
  );
}
