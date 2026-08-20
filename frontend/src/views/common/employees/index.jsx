import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import React from 'react'
import Header from './header'
import Toolbar from '@mui/material/Toolbar'

const Employee = () => {
  
  return (
    <Box>
        <Stack direction="row"></Stack>
        <Header />
        <Toolbar sx={{ minHeight: { xs: 54, sm: 46, md: 76 } }} />
        <h1>filter</h1>
        <h1>tabel</h1>
    </Box>
  )
}

export default Employee