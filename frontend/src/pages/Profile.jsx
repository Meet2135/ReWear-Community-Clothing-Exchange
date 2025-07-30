import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  IconButton,
  Paper,
  Divider,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Alert,
  Snackbar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Edit,
  Save,
  Cancel,
  PhotoCamera,
  Person,
  Email,
  Phone,
  LocationOn,
  Description,
  Settings,
  CheckCircle,
  Error
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, updateUser } from '../redux/slices/authSlice';

const Profile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    location: user?.location || '',
    phone: user?.phone || '',
    avatar: user?.avatar || '',
    preferences: {
      categories: user?.preferences?.categories || [],
      sizes: user?.preferences?.sizes || [],
      notifications: {
        email: user?.preferences?.notifications?.email ?? true,
        push: user?.preferences?.notifications?.push ?? true
      }
    }
  });

  const [avatarPreview, setAvatarPreview] = useState(null);

  const categories = ['men', 'women', 'kids', 'accessories', 'shoes', 'bags'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        location: user.location || '',
        phone: user.phone || '',
        avatar: user.avatar || '',
        preferences: {
          categories: user.preferences?.categories || [],
          sizes: user.preferences?.sizes || [],
          notifications: {
            email: user.preferences?.notifications?.email ?? true,
            push: user.preferences?.notifications?.push ?? true
          }
        }
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferenceChange = (type, value) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [type]: value
      }
    }));
  };

  const handleNotificationChange = (type) => (event) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        notifications: {
          ...prev.preferences.notifications,
          [type]: event.target.checked
        }
      }
    }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
      };
      reader.readAsDataURL(file);

      // Store file for upload
      setFormData(prev => ({
        ...prev,
        avatar: file
      }));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      
      // Add text fields
      formDataToSend.append('name', formData.name);
      formDataToSend.append('bio', formData.bio);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('phone', formData.phone);
      
      // Add preferences as JSON
      formDataToSend.append('preferences', JSON.stringify(formData.preferences));
      
      // Add avatar if it's a file
      if (formData.avatar instanceof File) {
        formDataToSend.append('avatar', formData.avatar);
      }

      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formDataToSend
      });

      const result = await response.json();

      if (response.ok) {
        // Update Redux store
        dispatch(updateUser(result.data));
        
        setSnackbar({
          open: true,
          message: 'Profile updated successfully!',
          severity: 'success'
        });
        setIsEditing(false);
        setAvatarPreview(null);
      } else {
        setSnackbar({
          open: true,
          message: result.message || 'Failed to update profile',
          severity: 'error'
        });
      }
    } catch (error) {
      console.error('Profile update error:', error);
      setSnackbar({
        open: true,
        message: 'Network error. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setAvatarPreview(null);
    // Reset form data to original user data
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        location: user.location || '',
        phone: user.phone || '',
        avatar: user.avatar || '',
        preferences: {
          categories: user.preferences?.categories || [],
          sizes: user.preferences?.sizes || [],
          notifications: {
            email: user.preferences?.notifications?.email ?? true,
            push: user.preferences?.notifications?.push ?? true
          }
        }
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Header */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
              fontSize: { xs: '2rem', md: '3rem' },
              mb: 2
            }}
          >
            Profile Settings
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: 400
            }}
          >
            Manage your account information and preferences
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Profile Picture Section */}
          <Grid item xs={12} md={4}>
            <Card
              elevation={0}
              sx={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                borderRadius: 4,
                border: '1px solid rgba(34, 197, 94, 0.1)',
                p: 4,
                textAlign: 'center'
              }}
            >
              <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
                <Avatar
                  src={avatarPreview || (user?.avatar && user.avatar !== 'default-avatar.jpg' ? `/uploads/avatars/${user.avatar}` : null)}
                  sx={{
                    width: 150,
                    height: 150,
                    fontSize: '3rem',
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                    border: '4px solid white',
                    boxShadow: '0 8px 32px rgba(34, 197, 94, 0.3)',
                    mb: 2
                  }}
                >
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </Avatar>
                
                {isEditing && (
                  <IconButton
                    component="label"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                      color: 'white',
                      border: '3px solid white',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                        transform: 'scale(1.1)',
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <PhotoCamera />
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </IconButton>
                )}
              </Box>

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  mb: 1
                }}
              >
                {user?.name || 'User Name'}
              </Typography>
              
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  mb: 3
                }}
              >
                {user?.email || 'user@example.com'}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                {!isEditing ? (
                  <Button
                    variant="contained"
                    startIcon={<Edit />}
                    onClick={() => setIsEditing(true)}
                    sx={{
                      background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                      borderRadius: 2,
                      px: 3,
                      py: 1.5,
                      fontWeight: 600,
                      textTransform: 'none',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 10px 20px rgba(34, 197, 94, 0.3)',
                      },
                    }}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      startIcon={<Save />}
                      onClick={handleSave}
                      disabled={loading}
                      sx={{
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        borderRadius: 2,
                        px: 3,
                        py: 1.5,
                        fontWeight: 600,
                        textTransform: 'none',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 10px 20px rgba(34, 197, 94, 0.3)',
                        },
                      }}
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Cancel />}
                      onClick={handleCancel}
                      sx={{
                        borderColor: theme.palette.error.main,
                        color: theme.palette.error.main,
                        borderRadius: 2,
                        px: 3,
                        py: 1.5,
                        fontWeight: 600,
                        textTransform: 'none',
                        '&:hover': {
                          borderColor: theme.palette.error.dark,
                          backgroundColor: theme.palette.error.light,
                          color: theme.palette.error.dark,
                        },
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </Box>
            </Card>
          </Grid>

          {/* Profile Information */}
          <Grid item xs={12} md={8}>
            <Card
              elevation={0}
              sx={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                borderRadius: 4,
                border: '1px solid rgba(34, 197, 94, 0.1)',
                p: 4
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  mb: 4
                }}
              >
                Personal Information
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <Person sx={{ mr: 1, color: theme.palette.text.secondary }} />
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    disabled={true} // Email should not be editable
                    InputProps={{
                      startAdornment: <Email sx={{ mr: 1, color: theme.palette.text.secondary }} />
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: theme.palette.grey[50],
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <Phone sx={{ mr: 1, color: theme.palette.text.secondary }} />
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <LocationOn sx={{ mr: 1, color: theme.palette.text.secondary }} />
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    multiline
                    rows={3}
                    InputProps={{
                      startAdornment: <Description sx={{ mr: 1, color: theme.palette.text.secondary, mt: 1 }} />
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />

              {/* Preferences Section */}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  mb: 3
                }}
              >
                Preferences
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth disabled={!isEditing}>
                    <InputLabel>Preferred Categories</InputLabel>
                    <Select
                      multiple
                      value={formData.preferences.categories}
                      onChange={(e) => handlePreferenceChange('categories', e.target.value)}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip
                              key={value}
                              label={value.charAt(0).toUpperCase() + value.slice(1)}
                              size="small"
                              sx={{
                                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                color: 'white',
                                fontWeight: 500
                              }}
                            />
                          ))}
                        </Box>
                      )}
                      sx={{
                        borderRadius: 2,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: isEditing ? undefined : theme.palette.grey[300],
                        },
                      }}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth disabled={!isEditing}>
                    <InputLabel>Preferred Sizes</InputLabel>
                    <Select
                      multiple
                      value={formData.preferences.sizes}
                      onChange={(e) => handlePreferenceChange('sizes', e.target.value)}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip
                              key={value}
                              label={value}
                              size="small"
                              sx={{
                                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                color: 'white',
                                fontWeight: 500
                              }}
                            />
                          ))}
                        </Box>
                      )}
                      sx={{
                        borderRadius: 2,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: isEditing ? undefined : theme.palette.grey[300],
                        },
                      }}
                    >
                      {sizes.map((size) => (
                        <MenuItem key={size} value={size}>
                          {size}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                      mb: 2
                    }}
                  >
                    Notification Settings
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.preferences.notifications.email}
                          onChange={handleNotificationChange('email')}
                          disabled={!isEditing}
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                              color: theme.palette.primary.main,
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                              backgroundColor: theme.palette.primary.main,
                            },
                          }}
                        />
                      }
                      label="Email Notifications"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.preferences.notifications.push}
                          onChange={handleNotificationChange('push')}
                          disabled={!isEditing}
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                              color: theme.palette.primary.main,
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                              backgroundColor: theme.palette.primary.main,
                            },
                          }}
                        />
                      }
                      label="Push Notifications"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          icon={snackbar.severity === 'success' ? <CheckCircle /> : <Error />}
          sx={{
            width: '100%',
            borderRadius: 2,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile; 