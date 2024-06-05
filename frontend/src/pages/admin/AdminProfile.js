import React from 'react';
import { useSelector } from 'react-redux'; 

const AdminProfile = () => {
  const { currentUser } = useSelector((state) => state.user); 

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      <div className="card" style={{ maxWidth: '400px', padding: '20px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}>
        <h5 className="card-title mb-4 font-weight-bold text-primary">Admin Profile</h5>
        <p className="card-text mb-1"><strong>Name:</strong> {currentUser.name}</p>
        <p className="card-text mb-1"><strong>Email:</strong> {currentUser.email}</p>
        <p className="card-text mb-1"><strong>Role:</strong> {currentUser.role}</p>
        <p className="card-text mb-1"><strong>School:</strong> {currentUser.schoolName}</p>
      </div>
    </div>
  );
};

export default AdminProfile;
