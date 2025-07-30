import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, getCurrentUser } from '../redux/slices/authSlice';
import { Box, Typography, Button, Paper } from '@mui/material';

const TestAdmin = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    // Force refresh user data
    if (localStorage.getItem('token')) {
      dispatch(getCurrentUser());
    }
  }, [dispatch]);

  const checkUserData = () => {
    console.log('=== USER DATA CHECK ===');
    console.log('User from Redux:', user);
    console.log('User role:', user?.role);
    console.log('Is admin?', user?.role === 'admin');
    console.log('Token:', localStorage.getItem('token'));
    
    // Test API call
    fetch('/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log('API Response:', data);
      if (data.success) {
        console.log('User role from API:', data.user.role);
        console.log('Is admin from API?', data.user.role === 'admin');
      }
    })
    .catch(err => console.error('API Error:', err));
  };

  return (
    <Box sx={{ p: 4, mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Admin Test Page
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Current User Data:
        </Typography>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </Paper>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Admin Status:
        </Typography>
        <Typography>
          Role: {user?.role || 'No role'}
        </Typography>
        <Typography>
          Is Admin: {user?.role === 'admin' ? 'YES' : 'NO'}
        </Typography>
      </Paper>
      
      <Button 
        variant="contained" 
        onClick={checkUserData}
        sx={{ mr: 2 }}
      >
        Check User Data (Console)
      </Button>
      
      <Button 
        variant="contained" 
        color="primary"
        href="/admin"
        sx={{ mr: 2 }}
      >
        Go to Admin Panel
      </Button>
      
      <Button 
        variant="outlined"
        onClick={() => window.location.reload()}
      >
        Refresh Page
      </Button>
    </Box>
  );
};

export default TestAdmin; 