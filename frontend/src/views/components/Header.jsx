import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'
import Search from '@/views/components/Search'
import { useMemo } from 'react'
import { usePathname } from '@/utils/navigation'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { handlerDrawerOpen, useGetMenuMaster } from '@/services/states/menu';
import { DRAWER_WIDTH } from '@/config';
import Button from '@mui/material/Button'
import { IconPlus } from '@tabler/icons-react'
import AddEditUserModel from '@/views/components/modals/AddEditUserModel'
import Toolbar from '@mui/material/Toolbar'

const Header = ({searchText, setSearchText, action, setOpenModal}) => {

    const currentPath = usePathname();
    const theme = useTheme();
      const { menuMaster } = useGetMenuMaster();
      const drawerOpen = menuMaster.isDashboardDrawerOpened;

    const title = useMemo(()=>{
        const path = currentPath.split("/").filter(item=>item)[0];
        const formated = `${path.slice(0, 1).toUpperCase()}${path.slice(1).toLocaleLowerCase()}`
        return formated;
    },[currentPath]);
    const style = {
        color: 'inherit',
        position: 'fixed',
        elevation: 0,
        sx: {
            borderBottom: `1px solid ${theme.vars.palette.grey[300]}`,
            zIndex: 1200,
            width: { xs: '100%', lg: drawerOpen ? `calc(100% - ${DRAWER_WIDTH+80}px)` : 1 },
            paddingBottom: '24px'
        }
    };
  return (
<Box>
    <Box {...style}>
    <Stack direction={"row"} justifyContent={'space-between'} alignItems={'center'} >
        <Typography sx={{fontWeight:'bold', fontSize:'22px'}}>{title}</Typography>

        <Stack direction={'row'} spacing={2}>
            <Search  searchText={searchText} setSearchText={setSearchText}/>
            {action}
        </Stack>
    </Stack>
    </Box>
<Toolbar sx={{ minHeight: { xs: 54, sm: 46, md: 76 } }} />
    </Box>
  )
}

export default Header