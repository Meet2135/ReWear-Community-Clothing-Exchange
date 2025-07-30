import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  IconButton,
  InputAdornment,
  Divider,
  Alert,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Link as MuiLink
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  SwapHoriz
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { login, clearError } from '../../redux/slices/authSlice';
import './Login.css';

// Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  rememberMe: Yup.boolean(),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    setIsSubmitting(true);
    try {
      const result = await dispatch(login(values)).unwrap();
      toast.success('Welcome back to ReWear! 🌱');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.includes('email')) {
        setFieldError('email', error);
      } else if (error.includes('password')) {
        setFieldError('password', error);
      } else if (error.includes('Invalid credentials')) {
        toast.error('Invalid email or password');
      } else {
        toast.error(error || 'Login failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.2
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.4,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <>
      <Helmet>
        <title>Login - ReWear</title>
        <meta name="description" content="Login to your ReWear account and start trading clothes with the community" />
      </Helmet>
      
      <Box
        className="login-container"
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 50%, #FF9800 100%)',
          display: 'flex',
          alignItems: 'center',
          py: 4,
          position: 'relative'
        }}
      >
        {/* Floating particles */}
        <div className="particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        
        <Container maxWidth="sm">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={cardVariants}>
              <Card
                className="login-card"
                elevation={24}
                sx={{
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  {/* Header */}
                  <Box textAlign="center" mb={4}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                                              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                          <Typography variant="h1" sx={{ fontSize: '3rem', color: 'primary.main', mr: 1 }}>
                            🌱
                          </Typography>
                          <Typography variant="h1" sx={{ fontSize: '3rem', color: 'secondary.main' }}>
                            🔄
                          </Typography>
                        </Box>
                      <Typography
                        variant="h3"
                        component="h1"
                        gutterBottom
                        className="login-title"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                          color: 'primary.main'
                        }}
                      >
                        Welcome Back
                      </Typography>
                    </motion.div>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ fontSize: '1.1rem', mb: 1 }}
                    >
                      Sign in to your ReWear account
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontStyle: 'italic' }}
                    >
                      Continue your sustainable fashion journey 🌱
                    </Typography>
                  </Box>

                  {/* Error Alert */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                      </Alert>
                    </motion.div>
                  )}

                  {/* Login Form */}
                  <motion.div variants={formVariants}>
                    <Formik
                      initialValues={{ email: '', password: '', rememberMe: false }}
                      validationSchema={LoginSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ values, errors, touched, handleChange, handleBlur }) => (
                        <Form>
                          <motion.div variants={itemVariants}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="email"
                              label="Email Address"
                              type="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.email && Boolean(errors.email)}
                              helperText={touched.email && errors.email}
                              className="input-field"
                              sx={{ mb: 3 }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Email color="primary" />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </motion.div>

                          <motion.div variants={itemVariants}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="password"
                              label="Password"
                              type={showPassword ? 'text' : 'password'}
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.password && Boolean(errors.password)}
                              helperText={touched.password && errors.password}
                              className="input-field"
                              sx={{ mb: 3 }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Lock color="primary" />
                                  </InputAdornment>
                                ),
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      onClick={() => setShowPassword(!showPassword)}
                                      edge="end"
                                    >
                                      {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </motion.div>

                          {/* Remember Me and Forgot Password */}
                          <motion.div variants={itemVariants}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                              <FormControlLabel
                                control={
                                  <Field
                                    as={Checkbox}
                                    name="rememberMe"
                                    color="primary"
                                  />
                                }
                                label="Remember me"
                                sx={{ color: 'text.secondary' }}
                              />
                              <MuiLink
                                href="#"
                                variant="body2"
                                sx={{
                                  color: 'primary.main',
                                  textDecoration: 'none',
                                  '&:hover': {
                                    textDecoration: 'underline',
                                  }
                                }}
                              >
                                Forgot password?
                              </MuiLink>
                            </Box>
                          </motion.div>

                          <motion.div variants={itemVariants}>
                            <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              size="large"
                              disabled={isLoading || isSubmitting}
                              className="login-button"
                              sx={{
                                py: 1.5,
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                borderRadius: 2,
                                background: 'linear-gradient(45deg, #4CAF50, #81C784)',
                                '&:hover': {
                                  background: 'linear-gradient(45deg, #388E3C, #66BB6A)',
                                },
                                mb: 3
                              }}
                            >
                              {isLoading || isSubmitting ? (
                                <CircularProgress size={24} color="inherit" className="loading-spinner" />
                              ) : (
                                'Sign In & Start Swapping'
                              )}
                            </Button>
                          </motion.div>
                        </Form>
                      )}
                    </Formik>
                  </motion.div>

                  {/* Divider */}
                  <Box sx={{ my: 3, display: 'flex', alignItems: 'center' }}>
                    <Divider sx={{ flex: 1 }} />
                    <Typography variant="body2" sx={{ mx: 2, color: 'text.secondary' }}>
                      Join the sustainable fashion movement
                    </Typography>
                    <Divider sx={{ flex: 1 }} />
                  </Box>

                  {/* Footer Links */}
                  <Box textAlign="center">
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Don't have an account?{' '}
                      <Link
                        to="/register"
                        style={{
                          color: '#4CAF50',
                          textDecoration: 'none',
                          fontWeight: 600,
                        }}
                      >
                        Join ReWear Community
                      </Link>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', fontStyle: 'italic' }}>
                      Every swap helps reduce textile waste and build a sustainable future 🌍
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default Login; 