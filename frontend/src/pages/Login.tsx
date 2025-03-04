import { useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  FormControlLabel,
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
  password: yup.string().required('Password is required'),
  rememberMe: yup.boolean(),
});

interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

function Login() {
  const { login } = useAuth();
  const toast = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await authApi.login(data);
      login(response.token, response.user);
      toast.showSuccess('Successfully logged in');
      navigate(from, { replace: true });
    } catch (error) {
      toast.showError('Invalid email or password');
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
                  Welcome back
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sign in to continue to Article Humanizer
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
                        autoComplete="current-password"
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

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: 1,
                    }}
                  >
                    <Controller
                      name="rememberMe"
                      control={control}
                      render={({ field }) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              {...field}
                              checked={field.value}
                              color="primary"
                            />
                          }
                          label="Remember me"
                        />
                      )}
                    />

                    <Link
                      component={RouterLink}
                      to="/forgot-password"
                      variant="body2"
                      color="primary"
                      underline="hover"
                    >
                      Forgot password?
                    </Link>
                  </Box>

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isSubmitting}
                    fullWidth
                  >
                    {isSubmitting ? 'Signing in...' : 'Sign in'}
                  </Button>

                  <Typography variant="body2" align="center">
                    Don't have an account?{' '}
                    <Link
                      component={RouterLink}
                      to="/register"
                      color="primary"
                      underline="hover"
                    >
                      Sign up
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

export default Login;
