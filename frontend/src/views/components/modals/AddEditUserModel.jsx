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

const AddEditUserModel = ({open, handleClose,handleSave=()=>{}, data, action }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle component={Stack} direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{py:`4px !important`}}>
            <Typography variant='h5'>Add User</Typography>
            <IconButton shape='rounded' color='secondary' onClick={handleClose}><IconX/></IconButton>
        </DialogTitle>
        <Divider/>
        <DialogContent>
            <AuthRegister data={data} action={action} handleClose={handleClose}/>
        </DialogContent>
        <Divider/> 
        <DialogActions sx={{justifyContent:'start', p:'16px 24px'}}>
            <Button onClick={handleSave} variant='contained'> Save</Button>
            <Button onClick={handleClose} color='secondary'> Close</Button>
        </DialogActions>
    </Dialog>
  )
}

export default AddEditUserModel