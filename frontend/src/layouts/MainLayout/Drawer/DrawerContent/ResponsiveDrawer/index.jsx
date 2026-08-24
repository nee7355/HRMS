// @mui
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
// import menuItems from '@/menu';
import NavGroup from './NavGroup';
import NavItem from './NavItem';
import { useMemo } from 'react';
import { getUser } from '../../../../../services/auth/auth';
import menuList from '../../../../../menu/sidebarMenu';

/***************************  DRAWER CONTENT - RESPONSIVE DRAWER  ***************************/

export default function ResponsiveDrawer() {
  const user = getUser();

  const menus = useMemo(()=>{
      const menu = menuList[user.role.toLowerCase()]
      
      return {
        items: [...menu]
      }
  },[user])

  const navGroups = menus.items.map((item, index) => {
  
    switch (item.type) {
      case 'group':
        return <NavGroup key={index} item={item} />;
      case 'item':
        return <NavItem key={index} item={item}/>
      default:
        return (
          <Typography key={index} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ py: 1, transition: 'all 0.3s ease-in-out' }}>{navGroups}</Box>;
}
