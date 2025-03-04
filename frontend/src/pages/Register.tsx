import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../providers/AuthProvider';
import { useToast } from '../providers/ToastProvider';
import { authApi } from '../lib/api';

const schema = yup.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

function Register() {
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await authApi.register(data);
      login(response.token, response.user);
      toast.showSuccess('Successfully registered');
      navigate('/dashboard', { replace: true });
    } catch (error) {
      toast.showError('Registration failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)', // Subtract navbar height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        py: 8,
        px: 2,
        background: 'linear-gradient(135deg, #f6f9fc 0%, #edf2f7 100%)',
      }}
    >
      <Container maxWidth="sm" sx={{ width: '100%' }}>
        <Card elevation={3}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Stack spacing={4}>
              <Box textAlign="center">
                <Typography variant="h4" component="h1" gutterBottom>
                  Create an account
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Get started with Article Humanizer
                </Typography>
              </Box>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Stack spacing={3}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Email address"
                        type="email"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        autoComplete="email"
                        fullWidth
                        required
                      />
                    )}
                  />

                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        autoComplete="new-password"
                        required
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />

                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type={showConfirmPassword ? 'text' : 'password'}
                        label="Confirm password"
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        autoComplete="new-password"
                        required
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle confirm password visibility"
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                                edge="end"
                              >
                                {showConfirmPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isSubmitting}
                    fullWidth
                  >
                    {isSubmitting ? 'Creating account...' : 'Create account'}
                  </Button>

                  <Typography variant="body2" align="center">
                    Already have an account?{' '}
                    <Link
                      component={RouterLink}
                      to="/login"
                      color="primary"
                      underline="hover"
                    >
                      Sign in
                    </Link>
                  </Typography>
                </Stack>
              </form>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Register;
