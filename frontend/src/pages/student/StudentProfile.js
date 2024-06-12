import React from 'react';
import { Typography, Container,  Grid, Card } from '@mui/material';
import { useSelector } from 'react-redux';

const StudentProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
     <Container maxWidth="lg" style={{  display: 'flex', justifyContent: 'center', marginTop:'50px' }}>
     <Grid container justifyContent="center">
       <Grid item xs={12} sm={8} md={6}>
         <Card sx={{ p: 4, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }} >
           <Typography variant="h4" component="h2" gutterBottom color="primary" align="center"> Student Profile</Typography>
           <Typography variant="body1" gutterBottom style={{ fontSize: '1.4rem' }}><strong>Name: </strong> {currentUser.name}</Typography>
           <Typography variant="body1" gutterBottom style={{ fontSize: '1.4rem' }}><strong>Roll No: </strong> {currentUser.rollNum}</Typography>
           <Typography variant="body1" gutterBottom style={{ fontSize: '1.4rem' }}><strong>Class: </strong>{currentUser.sclassName.sclassName}</Typography>
           <Typography variant="body1" gutterBottom style={{ fontSize: '1.4rem' }}><strong>School: </strong> {currentUser.school.schoolName}</Typography>
         </Card>
       </Grid>
     </Grid>
   </Container>
   </>
  );
};

export default StudentProfile;
