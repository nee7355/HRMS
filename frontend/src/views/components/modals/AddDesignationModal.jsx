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
import FormHelperText from '@mui/material/FormHelperText'
import Box from '@mui/material/Box'
import { useDispatch, useSelector } from 'react-redux'
import { createDepartment, deparmentSelector, editDepartment, fetchDepartments } from '../../../store/slices/departmentSlice'
import { useEffect } from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { createDesignation, editDesignation } from '../../../store/slices/designationSlice'

const AddDesignationModal = ({ open, handleClose, data={}, action='Add' }) => {
    const {
        register,
        handleSubmit,
        watch,
        control,
        reset,
        setValue,
        setError,
        formState: { errors }
    } = useForm();

    const {departments} = useSelector(deparmentSelector);
    const dispatch = useDispatch();
    const departmentId = watch("departmentId")

    useEffect(() => {
        const selectedDepartmentId = typeof data?.departmentId === 'object'
            ? data?.departmentId?._id
            : data?.departmentId;

        reset({
            departmentId: selectedDepartmentId || '',
            name: data?.name || '',
            description: data?.description || ''
        });
    }, [data, open, reset]);

    useEffect(()=>{
        dispatch(fetchDepartments());
    },[])

    const onSubmit = (formData) => {
        
        if(action==='Add')
        {
            dispatch(createDesignation(formData));
        }else if(action === 'Edit')
        {
            dispatch(editDesignation(formData, data._id));
        }

        handleClose();
    }

    console.log('data.........', data)
    console.log('departmentId?._id.........', departmentId?._id)
    return (
        <Dialog open={open} onClose={handleClose} sx={{ '& .MuiPaper-root ':{maxWidth:'500px', minHeight: '200px'}}}>
            <DialogTitle component={Stack} direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ py: `4px !important` }}>
                <Typography variant='h5'>{action} Department</Typography>
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
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        value={field.value ?? ''}
                                        labelId="role"
                                        sx={{
                                            width: '100%'
                                        }}
                                    >
                                        <MenuItem value="">--Select Department--</MenuItem>
                                        {departments.map((d) => (
                                            <MenuItem key={d._id} value={d._id}>{d.name}</MenuItem>
                                        ))}
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