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
import { Controller, useForm } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Box from '@mui/material/Box'
import { useDispatch, useSelector } from 'react-redux'
import { createDepartment, deparmentSelector, editDepartment, fetchDepartments } from '../../../store/slices/departmentSlice'
import { useEffect } from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { createDesignation } from '../../../store/slices/designationSlice'

const AddDesignationModal = ({ open, handleClose, data={}, action='Add' }) => {
    const {
        register,
        handleSubmit,
        watch,
        control,
        setValue,
        setError,
        formState: { errors }
    } = useForm();

    const {departments} = useSelector(deparmentSelector);
    const dispatch = useDispatch();

    useEffect(()=>{
        Object.entries(data).forEach(([key, value])=>{
            setValue(key, value,{
                shouldDirty: true,
                shouldValidate: true
            })
        })
    },[data]);

    useEffect(()=>{
        dispatch(fetchDepartments());
    },[])

    const onSubmit = (formData) => {
        if(action==='Add')
        {
            dispatch(createDesignation(formData));
        }else if(action === 'Edit')
        {
            dispatch(editDepartment(formData, data._id));
        }

        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleClose} sx={{ '& .MuiPaper-root ':{maxWidth:'500px', minHeight: '200px'}}}>
            <DialogTitle component={Stack} direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ py: `4px !important` }}>
                <Typography variant='h5'>Add Department</Typography>
                <IconButton shape='rounded' color='secondary' onClick={handleClose}><IconX /></IconButton>
            </DialogTitle>
            <Divider />
            <DialogContent>
                <form id='department-form' onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <Grid container rowSpacing={2} columnSpacing={1.5}>
                        <Grid size={{ xs: 12,}}>
                            <InputLabel id="role">Select Department</InputLabel>
                            <Controller
                                name='departmentId'
                                control={control}
                                defaultValue=''
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        labelId="role"
                                        sx={{
                                            width: '100%'
                                        }}
                                    >
                                        <MenuItem value="">--Select Department--</MenuItem>
                                        {departments.map((d)=><MenuItem value={d._id}>{d.name}</MenuItem>)}
                                    </Select>
                                )}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <InputLabel>Designation Name</InputLabel>
                            <OutlinedInput
                                {...register('name')}
                                placeholder="Enter designation name"
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

export default AddDesignationModal;