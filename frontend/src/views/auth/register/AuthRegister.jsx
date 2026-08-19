import PropTypes from 'prop-types';
import { useState, useRef } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

// @third-party
import { Controller, useForm } from 'react-hook-form';

// @project
import Contact from '@/components/Contact';
import { useRouter } from '@/utils/navigation';
import { emailSchema, passwordSchema, firstNameSchema, lastNameSchema } from '@/utils/validation-schema/common';

// @icons
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import Box from '@mui/material/Box';
import { salarySchema } from '../../../utils/validation-schema/common';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { handleRegister } from '../../../services/auth/auth';
import { useSnackbar } from 'notistack';

// @types

/***************************  AUTH - REGISTER  ***************************/

export default function AuthRegister({ inputSx }) {
  const router = useRouter();

  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [registerError, setRegisterError] = useState('');

   const { enqueueSnackbar } = useSnackbar();
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors }
  } = useForm({ defaultValues: { dialcode: '+91' } });

  const password = useRef({});
  password.current = watch('password', '');

  // Handle form submission
  
  const onSubmit = async(formData) => {

    try {
      console.log(formData)
      setIsProcessing(true);
      setRegisterError('');
      const res = await handleRegister(formData);
      
      if(res.status>=200&& res.status<=300){
        enqueueSnackbar("Registration Successfull");
        router.push('/login');
      }
    } catch (error) {
       console.error(error);
    }finally{
      setIsProcessing(false);
    }
  };

  const onInvalid = (formErrors) => {
    console.log('Registration form is invalid', formErrors);
  };
console.log("errors", errors)

  const commonIconProps = { size: 16, color: theme.vars.palette.grey[700] };

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} autoComplete="off">
      <Grid container rowSpacing={2} columnSpacing={1.5}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <InputLabel>First Name</InputLabel>
          <OutlinedInput
            {...register('firstName', firstNameSchema)}
            placeholder="Enter first name"
            fullWidth
            error={Boolean(errors.firstName)}
            sx={{ ...inputSx }}
          />
          {errors.firstName?.message && <FormHelperText error>{errors.firstName?.message}</FormHelperText>}
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <InputLabel>Last Name</InputLabel>
          <OutlinedInput
            {...register('lastName', lastNameSchema)}
            placeholder="Enter last name"
            fullWidth
            error={Boolean(errors.lastName)}
            sx={{ ...inputSx }}
          />
          {errors.lastName?.message && <FormHelperText error>{errors.lastName?.message}</FormHelperText>}
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <InputLabel>Email</InputLabel>
          <OutlinedInput
            {...register('email', emailSchema)}
            placeholder="abc@gmail.com"
            fullWidth
            error={Boolean(errors.email)}
            sx={{ ...inputSx }}
          />
          {errors.email?.message && <FormHelperText error>{errors.email?.message}</FormHelperText>}
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <InputLabel>Contact</InputLabel>
          <Contact
            fullWidth
            dialCode={watch('dialCode')}
            onCountryChange={(data) => setValue('dialCode', data.dialCode)}
            control={control}
            isError={Boolean(errors.phone)}
          />
          {errors.phone?.message && <FormHelperText error>{errors.phone?.message}</FormHelperText>}
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <InputLabel>Salary</InputLabel>
          <OutlinedInput
            {...register('salary', salarySchema)}
            type={'text'}
            placeholder="Enter User Salary"
            fullWidth
            autoComplete="off"
            error={Boolean(errors.salary)}
            sx={inputSx}
          />
          {errors.salary?.message && <FormHelperText error>{errors.salary?.message}</FormHelperText>}
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <InputLabel>Country</InputLabel>
          <OutlinedInput
            {...register('country')}
            type={'text'}
            placeholder="Country"
            fullWidth
            autoComplete="off"
            error={Boolean(errors.country)}
            sx={inputSx}
          />
          {errors.country?.message && <FormHelperText error>{errors.country?.message}</FormHelperText>}
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <InputLabel>State</InputLabel>
          <OutlinedInput
            {...register('state')}
            type={'text'}
            placeholder="State"
            fullWidth
            autoComplete="off"
            error={Boolean(errors.state)}
            sx={inputSx}
          />
          {errors.state?.message && <FormHelperText error>{errors.state?.message}</FormHelperText>}
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <InputLabel>Address</InputLabel>
          <OutlinedInput
            {...register('address')}
            type={'text'}
            placeholder="address"
            fullWidth
            autoComplete="off"
            error={Boolean(errors.address)}
            sx={inputSx}
          />
          {errors.address?.message && <FormHelperText error>{errors.address?.message}</FormHelperText>}
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <InputLabel id="role">Role</InputLabel>
          <Controller
            name='role'
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
                <MenuItem value="">--Select User--</MenuItem>
                <MenuItem value="ADMIN">ADMIN</MenuItem>
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="MANAGER">MANAGER</MenuItem>
                <MenuItem value="USER">USER</MenuItem>
              </Select>
            )}
          />
          {/* <Select
          {...register('role')}
            labelId='role'
            value={"USER"}
            // label = "role"
            onChange={()=>{}}
            sx={{
              width: '100%'
            }}
            
          >
            <MenuItem value="">--Select User--</MenuItem>
            <MenuItem value="ADMIN">ADMIN</MenuItem>
            <MenuItem value="HR">HR</MenuItem>
            <MenuItem value="MANAGER">MANAGER</MenuItem>
            <MenuItem value="USER">USER</MenuItem>
          </Select> */}
          {errors.role?.message && <FormHelperText error>{errors.role?.message}</FormHelperText>}
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <InputLabel>Password</InputLabel>
          <OutlinedInput
            {...register('password', passwordSchema)}
            type={isOpen ? 'text' : 'password'}
            placeholder="Enter password"
            fullWidth
            autoComplete="new-password"
            error={Boolean(errors.password)}
            endAdornment={
              <InputAdornment position="end" sx={{ cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <IconEye {...commonIconProps} /> : <IconEyeOff {...commonIconProps} />}
              </InputAdornment>
            }
            sx={inputSx}
          />
          {errors.password?.message && <FormHelperText error>{errors.password?.message}</FormHelperText>}
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <InputLabel>Confirm Password</InputLabel>
          <OutlinedInput
            {...register('confirmPassword', { validate: (value) => value === password.current || 'The passwords do not match' })}
            type={isConfirmOpen ? 'text' : 'password'}
            placeholder="Enter confirm password"
            fullWidth
            error={Boolean(errors.confirmPassword)}
            endAdornment={
              <InputAdornment position="end" sx={{ cursor: 'pointer' }} onClick={() => setIsConfirmOpen(!isConfirmOpen)}>
                {isConfirmOpen ? <IconEye {...commonIconProps} /> : <IconEyeOff {...commonIconProps} />}
              </InputAdornment>
            }
            sx={inputSx}
          />
          {errors.confirmPassword?.message && <FormHelperText error>{errors.confirmPassword?.message}</FormHelperText>}
        </Grid>
      </Grid>
      <Box sx={{ textAlign: 'center' }}>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          disabled={isProcessing}
          endIcon={isProcessing && <CircularProgress color="secondary" size={16} />}
          sx={{ minWidth: 120, mt: { xs: 2, sm: 4 }, '& .MuiButton-endIcon': { ml: 1 } }}
            // onClick={handleClick}
        >
          Sign Up
        </Button>
        {registerError && (
          <Alert sx={{ mt: 2 }} severity="error" variant="filled" icon={false}>
            {registerError}
          </Alert>
        )}
      </Box>
    </form>
  );
}

AuthRegister.propTypes = { inputSx: PropTypes.any };
