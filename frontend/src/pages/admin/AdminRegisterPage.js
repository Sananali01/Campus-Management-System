import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/userRelated/userHandle';
import bgpic from "../../assets/designlogin.jpg"
import Popup from '../../components/Popup';
import '../../CSS/AdminRegisterPage.css'

const AdminRegisterPage = () => {
    
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [toggle, setToggle] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [adminNameError, setAdminNameError] = useState(false);
    const [schoolNameError, setSchoolNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const role = "Admin";

    const handleSubmit = (event) => {
        event.preventDefault();
        const name = event.target.adminName.value;
        const schoolName = event.target.schoolName.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (!name || !schoolName || !email || !password) {
            setAdminNameError(!name);
            setSchoolNameError(!schoolName);
            setEmailError(!email);
            setPasswordError(!password);
            return;
        }

        const fields = { name, email, password, role, schoolName };
        setLoader(true);
        dispatch(registerUser(fields, role));
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'adminName') setAdminNameError(false);
        if (name === 'schoolName') setSchoolNameError(false);
    };

    useEffect(() => {
        if (status === 'success' || (currentUser !== null && currentRole === 'Admin')) {
            navigate('/Admin/dashboard');
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            console.log(error);
        }
    }, [status, currentUser, currentRole, navigate, error, response]);


    const handleToggle = () => {
        setToggle(!toggle);
    };

    
    return (
        <div className="container-fluid overflow-hidden admin-register-container ">
            <div className="row d-flex flex-nowrap">
                <div className="col-md-6 login-form admin-register-paper">
                    <h4 className="admin-register-title">Admin Register</h4>
                    <p className="admin-register-description">Create your own Dashboard by registering as an admin. You will be able to add students and faculty and manage the system.</p>
                    <form onSubmit={handleSubmit} className="admin-register-form">
                        <div className="mb-3">
                            <input type="text" className={`form-control  ${adminNameError ? 'is-invalid' : ''}`} placeholder="Enter your name" name="adminName" onChange={handleInputChange} />
                            {adminNameError && <div className="invalid-feedback">Name is required</div>}
                        </div>
                        <div className="mb-3">
                            <input type="text" className={`form-control  ${schoolNameError ? 'is-invalid' : ''}`} placeholder="Create your Campus name" name="schoolName" onChange={handleInputChange} />
                            {schoolNameError && <div className="invalid-feedback">Campus name is required</div>}
                        </div>
                        <div className="mb-3">
                            <input type="email" className={`form-control ${emailError ? 'is-invalid' : ''}`} placeholder="Enter your email" name="email" onChange={handleInputChange} />
                            {emailError && <div className="invalid-feedback">Email is required</div>}
                        </div>
                        <div className="mb-3">
                            <input type={toggle ? 'text' : 'password'} className={`form-control  ${passwordError ? 'is-invalid' : ''}`} placeholder="Password" name="password" onChange={handleInputChange} />
                            {passwordError && <div className="invalid-feedback">Password is required</div>}
                        </div>
                        <div className="mb-3 form-check ">
                            <input type="checkbox" className="form-check-input" id="rememberMe" onChange={handleToggle}/>
                            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                        </div>
                        <button type="submit" className="btn btn-purple">{loader ? <i className="fa fa-spinner fa-spin"></i> : 'Register'}</button>
                    </form>
                    <div className='mt-3'>
                        Already have an account? <Link to="/Adminlogin" className="admin-register-link">Log in</Link>
                    </div>
                </div>
                <div className="col-md-6">
                <img src={bgpic} alt="students" className="img-fluid" />
                </div>
            </div>
            {showPopup && <Popup message={message} setShowPopup={setShowPopup} />}
        </div>
    );
}

export default AdminRegisterPage;
