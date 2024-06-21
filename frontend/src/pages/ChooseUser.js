import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserGraduate, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import Popup from '../components/Popup';
import '../CSS/Chooseuser.css';

const ChooseUser = ({ visitor }) => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [selectedUser, setSelectedUser] = useState("");

    const loginUser = (fields, user) => {
        setTimeout(() => {
            setLoader(false);
            if (fields.email === "yogendra@12" && user === "Admin") {
                navigate('/Admin/dashboard');
            } else if (fields.rollNum === "1" && user === "Student") {
                navigate('/Student/dashboard');
            } else if (fields.email === "tony@12" && user === "Teacher") {
                navigate('/Teacher/dashboard');
            } else {
                setMessage("Login failed");
                setShowPopup(true);
            }
        }, 1000);
    }

    const handleUserSelection = (user) => {
        setSelectedUser(user);
    }

    const handleLogin = () => {
        setLoader(true);
        if (selectedUser === "Admin") {
            if (visitor === "guest") {
                const email = "yogendra@12"
                const password = "zxc"
                const fields = { email, password }
                loginUser(fields, "Admin");
            } else {
                navigate('/Adminlogin');
            }
        } else if (selectedUser === "Student") {
            if (visitor === "guest") {
                const rollNum = "1"
                const studentName = "Dipesh Awasthi"
                const password = "zxc"
                const fields = { rollNum, studentName, password }
                loginUser(fields, "Student");
            } else {
                navigate('/Studentlogin');
            }
        } else if (selectedUser === "Teacher") {
            if (visitor === "guest") {
                const email = "tony@12"
                const password = "zxc"
                const fields = { email, password }
                loginUser(fields, "Teacher");
            } else {
                navigate('/Teacherlogin');
            }
        }
    }

    useEffect(() => {
        // Code to run after login state changes
    }, []);

    return (
        <div className="container-fluid choose-user-container">
            <div className="row justify-content-center">
           
                    <div className="choose-card">
                        <div className="card-body">
                            <h2 className="card-title">Choose User Role</h2>
                            <div className="role-options">
                                <div
                                    className={`role-option ${selectedUser === "Admin" ? 'selected' : ''}`}
                                    onClick={() => handleUserSelection("Admin")}
                                >
                                    <FontAwesomeIcon icon={faUser} className="user-icon" />
                                    <span>Admin</span>
                                </div>
                                <div
                                    className={`role-option ${selectedUser === "Student" ? 'selected' : ''}`}
                                    onClick={() => handleUserSelection("Student")}
                                >
                                    <FontAwesomeIcon icon={faUserGraduate} className="user-icon" />
                                    <span>Student</span>
                                </div>
                                <div
                                    className={`role-option ${selectedUser === "Teacher" ? 'selected' : ''}`}
                                    onClick={() => handleUserSelection("Teacher")}
                                >
                                    <FontAwesomeIcon icon={faChalkboardTeacher} className="user-icon" />
                                    <span>Teacher</span>
                                </div>
                            </div>
                            {selectedUser && (
                                <div className="user-info">
                                    <FontAwesomeIcon
                                        icon={selectedUser === "Admin" ? faUser :
                                              selectedUser === "Student" ? faUserGraduate : faChalkboardTeacher}
                                        className="selected-user-icon"
                                    />
                                    <h3>{selectedUser}</h3>
                                    <p>
                                        {selectedUser === "Admin" ? "Login as an administrator to access the dashboard to manage app data." :
                                         selectedUser === "Student" ? "Login as a student to explore course materials and assignments." :
                                         "Login as a teacher to create courses, assignments, and track student's progress."}
                                    </p>
                                </div>
                            )}
                            <button
                                className={`login-btn ${selectedUser ? '' : 'disabled'}`}
                                onClick={handleLogin}
                                disabled={!selectedUser || loader}
                            >
                                {loader ? "Logging in..." : "Login"}
                            </button>
                        </div>
                    </div>
            </div>
            {loader && (
                <div className="backdrop">
                    <div className="loader">Please Wait</div>
                </div>
            )}
            {showPopup && <Popup message={message} setShowPopup={setShowPopup} />}
        </div>
    );
};

export default ChooseUser;
