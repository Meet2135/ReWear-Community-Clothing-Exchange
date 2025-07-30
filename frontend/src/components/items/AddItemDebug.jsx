import React, { useState } from 'react';
import { Box, Typography, Button, Paper, TextField, Alert } from '@mui/material';
import api from '../../services/api';

const AddItemDebug = () => {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const testSimpleItem = async () => {
    try {
      setResult('');
      setError('');
      
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please login first.');
        return;
      }

      const formData = new FormData();
      formData.append('title', 'Test Item');
      formData.append('description', 'This is a test item');
      formData.append('category', 'men');
      formData.append('type', 'shirts');
      formData.append('size', 'M');
      formData.append('condition', 'good');
      formData.append('color', 'Blue');
      formData.append('pointsValue', '50');
      formData.append('location', 'Test Location');

      console.log('Sending request to:', api.defaults.baseURL + '/items');
      console.log('Token:', token);

      const response = await api.post('/items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      console.log('Response:', response);
      setResult(JSON.stringify(response.data, null, 2));
      
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
      if (err.response) {
        console.error('Response error:', err.response.data);
        setError(`Server error: ${err.response.data.message || 'Unknown error'}`);
      }
    }
  };

  const testAPI = async () => {
    try {
      setResult('');
      setError('');
      
      const response = await api.get('/items');
      console.log('API test response:', response);
      setResult(`API is working! Found ${response.data.count} items.`);
      
    } catch (err) {
      console.error('API test error:', err);
      setError(`API test failed: ${err.message}`);
    }
  };

  return (
    <Box sx={{ p: 4, mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Add Item Debug
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Debug Tools
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button 
            variant="contained" 
            onClick={testAPI}
            sx={{ mr: 2 }}
          >
            Test API Connection
          </Button>
          
          <Button 
            variant="contained" 
            color="secondary"
            onClick={testSimpleItem}
          >
            Test Simple Item Creation
          </Button>
        </Box>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        {result && (
          <Alert severity="success" sx={{ mb: 2 }}>
            <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
              {result}
            </Typography>
          </Alert>
        )}
      </Paper>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Current Status
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Token: {localStorage.getItem('token') ? 'Present' : 'Missing'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          API URL: {api.defaults.baseURL}
        </Typography>
      </Paper>
    </Box>
  );
};

export default AddItemDebug; 