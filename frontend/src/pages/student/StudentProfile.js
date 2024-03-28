import React from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography, Grid, Box, Avatar, Container, Paper } from '@mui/material';
import { useSelector } from 'react-redux';

const StudentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const sclassName = currentUser.sclassName
  const studentSchool = currentUser.school
  
  

  return (
    <>
      <Container maxWidth="md">
        <StyledPaper elevation={3}>
          <Grid container spacing={3} alignItems="center" justifyContent="center">
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <StyledAvatar alt="Student Avatar" sx={{ width: 150, height: 150 }}>
                  {String(currentUser.name).charAt(0)}
                </StyledAvatar>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" component="h2" textAlign="center">
                {currentUser.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" component="p" textAlign="center">
              <strong>Student Roll No:</strong> {currentUser.rollNum}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" component="p" textAlign="center">
              <strong>Class:</strong> {sclassName.sclassName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" component="p" textAlign="center">
              <strong>School:</strong> {studentSchool.schoolName}
              </Typography>
            </Grid>
          </Grid>
        </StyledPaper>
        <StyledCard>
          <CardContent>
            <Typography variant="h5" gutterBottom textAlign="center" mb={4}>
              Personal Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p">
                  <strong>Date of Birth:</strong> January 1, 2000
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p">
                  <strong>Gender:</strong> Male
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p">
                  <strong>Email:</strong> john.doe@example.com
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p">
                  <strong>Phone:</strong> (123) 456-7890
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p">
                  <strong>Address:</strong> 123 Main Street, City, Country
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p">
                  <strong>Emergency Contact:</strong> (987) 654-3210
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </StyledCard>
      </Container>
    </>
  )
}

export default StudentProfile;

const StyledPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
`;

const StyledCard = styled(Card)`
  margin-top: 20px;
`;

const StyledAvatar = styled(Avatar)`
  width: 150px;
  height: 150px;
  background-color: #ff5722; /* You can change the background color */
`;
