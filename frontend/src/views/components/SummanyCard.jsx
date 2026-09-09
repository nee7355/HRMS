import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { IconUsers } from '@tabler/icons-react'
import React from 'react'

const color = {
   cardBackground: '#E0E0FF',
   iconBackground: '#BDC2FF',
   
}
const SummanyCard = ({icon, title, totalCount, color}) => {
  return (
    <Box sx={{width: '250px', backgroundColor: '#E0E0FF', padding: '16px', borderRadius:'8px'}}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={3}>
            <Box sx={{background: '#BDC2FF', padding: '8px', borderRadius: '10px', display: 'flex', alignItems:'center', justifyContent: 'center'}}>
              {icon}
            </Box>
            <Stack spacing={1}>
                <Typography variant='h6' fontWeight={'bold'} color='primary'>{title}</Typography>
                <Typography variant='h3' fontWeight={'bold'}>{totalCount}</Typography>
            </Stack>
        </Stack>
    </Box>
  )
}

export default SummanyCard