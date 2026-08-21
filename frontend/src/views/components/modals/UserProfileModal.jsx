import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import React from 'react'
import AuthRegister from '../../pages/auth/register/AuthRegister'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { IconX } from '@tabler/icons-react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'

const UserProfileModal = ({open, handleClose, data}) => {
    console.log('data...0', data)
  return (
    <>
     <Dialog open={open} onClose={handleClose} sx={{'& .MuiPaper-root ':{minWidth:'500px', minHeight: '200px'}}}>
        <DialogTitle component={Stack} direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{py:`4px !important`}}>
            <Typography variant='h5'>User Profile</Typography>
            <IconButton shape='rounded' color='secondary' onClick={handleClose}><IconX/></IconButton>
        </DialogTitle>
        <Divider/>
        <DialogContent>
            {data&&<Box>
                <Typography pb={.5}>
                    <Typography component={'span'} fontWeight={'bold'}>Full Name: </Typography>
                    {`${data?.firstName} ${data?.lastName}`}
                </Typography>
                {/* <Typography pb={.5}>
                    <Typography component={'span'} fontWeight={'bold'}>Full Name: </Typography>
                    {`${data?.firstName} ${data?.lastName}`}
                </Typography> */}
                <Typography pb={.5}>
                    <Typography component={'span'} fontWeight={'bold'}>Email: </Typography>
                    {data?.email}
                </Typography>
                <Typography pb={.5}>
                    <Typography component={'span'} fontWeight={'bold'}>Phone: </Typography>
                    {data?.phone}
                </Typography>
                <Typography pb={.5}>
                    <Typography component={'span'} fontWeight={'bold'}>Country: </Typography>
                    {data?.country}
                </Typography>
                <Typography pb={.5}>
                    <Typography component={'span'} fontWeight={'bold'}>State: </Typography>
                    {data?.state}
                </Typography>
                <Typography pb={.5}>
                    <Typography component={'span'} fontWeight={'bold'}>Address: </Typography>
                    {data?.address}
                </Typography>
                <Typography pb={.5}>
                    <Typography component={'span'} fontWeight={'bold'}>Role: </Typography>
                    {data?.role}
                </Typography>
                </Box>}
        </DialogContent>
        <Divider/> 
        <DialogActions sx={{justifyContent:'start', p:'16px 24px'}}>
            {/* <Button onClick={handleSave} variant='contained'> Save</Button> */}
            <Button onClick={handleClose} color='secondary' variant='contained'> Close</Button>
        </DialogActions>
    </Dialog>
    </>
  )
}

export default UserProfileModal