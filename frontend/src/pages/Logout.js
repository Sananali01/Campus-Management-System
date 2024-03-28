import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';
import '../CSS/Logout.css'

const Logout = () => {
    const currentUser = useSelector(state => state.user.currentUser);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className="container mt-5">
            <div className="card-logout">
                <div className="card-logout-body">
                    <h1>{currentUser.name}</h1>
                    <p className="mb-4">Are you sure you want to log out?</p>
                    <button onClick={handleLogout} className="btn btn-blue mr-2">Log Out</button>
                    <button onClick={handleCancel} className="btn btn-logout">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Logout;
