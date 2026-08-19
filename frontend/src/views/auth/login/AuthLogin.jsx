import PropTypes from 'prop-types';
import { useState } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @third-party
import { useForm } from 'react-hook-form';

// @project
import { APP_DEFAULT_PATH } from '@/config';
import RouterLink from '@/components/Link';
import { useRouter } from '@/utils/navigation';
import { emailSchema, passwordSchema } from '@/utils/validation-schema/common';

// @icons
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { handleLogin } from '../../../services/auth/auth';
import { useSnackbar } from 'notistack';

// Mock user credentials
const userCredentials = [
  { title: 'Admin', email: 'admin@gmail.com', password: 'Admin@123' },
  { title: 'HR', email: 'hr@gmail.com', password: 'Hr@12345' },
  { title: 'Manager', email: 'manager@gmail.com', password: 'Manager@123' },
  { title: 'User', email: 'user@gmail.com', password: 'User@123' }
];

function isChildObjectContained(parent, child) {
  return Object.entries(child).every(([key, value]) => parent.hasOwnProperty(key) && parent[key] === value);
}

/***************************  AUTH - LOGIN  ***************************/

export default function AuthLogin({ inputSx }) {
  const router = useRouter();
  const theme = useTheme();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loginError, setLoginError] = useState('');

   const { enqueueSnackbar } = useSnackbar();

  // Initialize react-hook-form
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ defaultValues: { email: 'admin@gmail.com', password: 'Admin@123' } });

  const formData = watch();

  // Handle form submission
  const onSubmit = async(formData) => {
    try {
      setIsProcessing(true);
      setLoginError('');
      const res = await handleLogin(formData);
      enqueueSnackbar("Login Successfully")
      router.push(APP_DEFAULT_PATH);
    } catch (error) {
        console.error(`login filed: ${error}`)
    }finally{
      setIsProcessing(false)
    }
  };

  const commonIconProps = { size: 16, color: theme.vars.palette.grey[700] };

  return (
    <>
      <Stack direction="row" sx={{ gap: 1, mb: 2 }}>
        {userCredentials.map((credential) => (
          <Button
            key={credential.title}
            variant="outlined"
            color={isChildObjectContained(credential, formData) ? 'primary' : 'secondary'}
            sx={{ flex: 1 }}
            onClick={() => {
              reset({ email: credential.email, password: credential.password });
            }}
          >
            {credential.title}
          </Button>
        ))}
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack sx={{ gap: 2 }}>
          <Box>
            <InputLabel>Email</InputLabel>
            <OutlinedInput
              {...register('email', emailSchema)}
              placeholder="abc@gmail.com"
              fullWidth
              error={Boolean(errors.email)}
              sx={inputSx}
            />
            {errors.email?.message && <FormHelperText error>{errors.email.message}</FormHelperText>}
          </Box>

          <Box>
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              {...register('password', passwordSchema)}
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="Enter your password"
              fullWidth
              error={Boolean(errors.password)}
              endAdornment={
                <InputAdornment position="end" sx={{ cursor: 'pointer' }} onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                  {isPasswordVisible ? <IconEye {...commonIconProps} /> : <IconEyeOff {...commonIconProps} />}
                </InputAdornment>
              }
              sx={inputSx}
            />
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: errors.password ? 'space-between' : 'flex-end', width: 1 }}>
              {errors.password?.message && <FormHelperText error>{errors.password.message}</FormHelperText>}
              <Link
                component={RouterLink}
                underline="hover"
                variant="caption"
                to="#"
                textAlign="right"
                sx={{ '&:hover': { color: 'primary.dark' }, mt: 0.75 }}
              >
                Forgot Password?
              </Link>
            </Stack>
          </Box>
        </Stack>
        <Box sx={{ textAlign: 'center' }}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={isProcessing}
            endIcon={isProcessing && <CircularProgress color="secondary" size={16} />}
            sx={{ minWidth: 120, mt: { xs: 1, sm: 4 }, '& .MuiButton-endIcon': { ml: 1 } }}
          >
            Login
          </Button>

          {loginError && (
            <Alert sx={{ mt: 2 }} severity="error" variant="filled" icon={false}>
              {loginError}
            </Alert>
          )}
        </Box>
      </form>
    </>
  );
}

AuthLogin.propTypes = { inputSx: PropTypes.any };
