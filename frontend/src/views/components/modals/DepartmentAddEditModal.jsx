import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { IconX } from '@tabler/icons-react'
import Stack from '@mui/material/Stack'
import { useForm } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Box from '@mui/material/Box'
import { useDispatch } from 'react-redux'
import { createDepartment, editDepartment } from '../../../store/slices/departmentSlice'
import { useEffect } from 'react'

const DepartmentAddEditModal = ({ open, handleClose, data, action }) => {
    const {
        register,
        handleSubmit,
        watch,
        control,
        setValue,
        setError,
        formState: { errors }
    } = useForm();

    const dispatch = useDispatch();

    useEffect(()=>{
        Object.entries(data).forEach(([key, value])=>{
            setValue(key, value,{
                shouldDirty: true,
                shouldValidate: true
            })
        })
    },[data]);

    const onSubmit = (formData) => {
        if(action==='Add')
        {
            dispatch(createDepartment(formData));
        }else if(action === 'Edit')
        {
            dispatch(editDepartment(formData, data._id));
        }


        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle component={Stack} direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ py: `4px !important` }}>
                <Typography variant='h5'>Add Department</Typography>
                <IconButton shape='rounded' color='secondary' onClick={handleClose}><IconX /></IconButton>
            </DialogTitle>
            <Divider />
            <DialogContent>
                <form id='department-form' onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <Grid container rowSpacing={2} columnSpacing={1.5}>
                        <Grid size={{ xs: 12 }}>
                            <InputLabel>Deartment Name</InputLabel>
                            <OutlinedInput
                                {...register('name')}
                                placeholder="Enter department name"
                                fullWidth
                                error={Boolean(errors.name)}

                            />
                            {errors.name?.message && <FormHelperText error>{errors.name?.message}</FormHelperText>}
                        </Grid>
                        <Grid size={{ xs: 12, }}>
                            <InputLabel>Description</InputLabel>
                            <OutlinedInput
                                {...register('description')}
                                placeholder="Enter description"
                                fullWidth
                                error={Boolean(errors.description)}

                            />
                            {errors.lastName?.description && <FormHelperText error>{errors.lastName?.description}</FormHelperText>}
                        </Grid>

                    </Grid>
                    <Box sx={{ textAlign: 'center' }}>

                        {/* {registerError && (
                            <Alert sx={{ mt: 2 }} severity="error" variant="filled" icon={false}>
                                {registerError}
                            </Alert>
                            )} */}
                    </Box>
                </form>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ justifyContent: 'start', p: '16px 24px' }}>
                <Button
                    type='submit'
                    form='department-form'
                    variant='contained'> Save</Button>
                <Button onClick={handleClose} color='secondary'> Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DepartmentAddEditModal