import React from 'react';
import { Container, Typography, Card, CardContent } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const SwapRequests = () => {
  return (
    <>
      <Helmet>
        <title>Swap Requests - ReWear</title>
      </Helmet>
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom>
          Swap Requests
        </Typography>
        
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Coming Soon!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Swap requests functionality will be available soon.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default SwapRequests; 