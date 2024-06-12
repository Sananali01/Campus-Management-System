import React from 'react';
import { useSelector } from 'react-redux'; 
import { Container, Card, Typography, Grid } from '@mui/material'; // Import Material-UI components

const AdminProfile = () => {
  const { currentUser } = useSelector((state) => state.user); 

  return (
    <Container maxWidth="lg" style={{  display: 'flex', justifyContent: 'center', marginTop:'50px' }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Card sx={{ p: 4, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }} >
            <Typography variant="h4" component="h2" gutterBottom color="primary" align="center">Admin Profile</Typography>
            <Typography variant="body1" gutterBottom style={{ fontSize: '1.4rem' }}><strong>Name:</strong> {currentUser.name}</Typography>
            <Typography variant="body1" gutterBottom style={{ fontSize: '1.4rem' }}><strong>Email:</strong> {currentUser.email}</Typography>
            <Typography variant="body1" gutterBottom style={{ fontSize: '1.4rem' }}><strong>Role:</strong> {currentUser.role}</Typography>
            <Typography variant="body1" gutterBottom style={{ fontSize: '1.4rem' }}><strong>School:</strong> {currentUser.schoolName}</Typography>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminProfile;
