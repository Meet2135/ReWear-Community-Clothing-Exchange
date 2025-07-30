import React from 'react';
import { Container, Typography, Card, CardContent } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const ItemDetail = () => {
  return (
    <>
      <Helmet>
        <title>Item Details - ReWear</title>
      </Helmet>
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom>
          Item Details
        </Typography>
        
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Coming Soon!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Item detail functionality will be available soon.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default ItemDetail; 