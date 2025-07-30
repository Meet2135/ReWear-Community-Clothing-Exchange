import React from 'react';
import { Container, Typography, Card, CardContent } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const Profile = () => {
  return (
    <>
      <Helmet>
        <title>Profile - ReWear</title>
      </Helmet>
      
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom>
          Profile
        </Typography>
        
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Coming Soon!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Profile functionality will be available soon.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Profile; 