import React from 'react';
import { Box, Typography, Button } from '@mui/material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          padding={3}
          textAlign="center"
        >
          <Typography variant="h4" color="error" gutterBottom>
            Oops! Something went wrong.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            We're sorry, but something unexpected happened. Please try refreshing the page.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            Refresh Page
          </Button>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <Box mt={4} textAlign="left" maxWidth="600px">
              <Typography variant="h6" gutterBottom>
                Error Details (Development):
              </Typography>
              <Typography variant="body2" component="pre" sx={{ 
                backgroundColor: '#f5f5f5', 
                padding: 2, 
                borderRadius: 1,
                overflow: 'auto',
                fontSize: '0.75rem'
              }}>
                {this.state.error.toString()}
              </Typography>
            </Box>
          )}
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 