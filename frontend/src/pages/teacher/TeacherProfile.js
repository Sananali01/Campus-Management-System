import React from 'react'
import styled from 'styled-components';
import { Card, CardContent, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const TeacherProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const teachSclass = currentUser.teachSclass
  const teachSubject = currentUser.teachSubject
  const teachSchool = currentUser.school

  return (
    <>
      <ProfileCard>
        <ProfileCardContent>
          <ProfileText><strong>Name:</strong> {currentUser.name}</ProfileText>
          <ProfileText><strong>Email:</strong> {currentUser.email}</ProfileText>
          <ProfileText><strong>Class:</strong> {teachSclass.sclassName}</ProfileText>
          <ProfileText><strong>Subject:</strong> {teachSubject.subName}</ProfileText>
          <ProfileText><strong>School:</strong> {teachSchool.schoolName}</ProfileText>

        </ProfileCardContent>
      </ProfileCard>
    </>
  )
}

export default TeacherProfile

const ProfileCard = styled(Card)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ProfileCardContent = styled(CardContent)`
  text-align: left;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 8px;
  max-width: 400px; /* Adjust width as needed */
  font-size: 20px; /* Increase font size */
  box-shadow: 4px 8px 10px 2px black; /* Add box shadow for 3D effect */
`;

const ProfileText = styled(Typography)`
  margin-bottom: 10px; /* Add spacing between info items */
`;
