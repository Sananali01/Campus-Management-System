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

    const navigateHandler = (user) => {
        setLoader(true);
        if (user === "Admin") {
            if (visitor === "guest") {
                const email = "yogendra@12"
                const password = "zxc"
                const fields = { email, password }
                loginUser(fields, user);
            }
            else {
                navigate('/Adminlogin');
            }
        } else if (user === "Student") {
            if (visitor === "guest") {
                const rollNum = "1"
                const studentName = "Dipesh Awasthi"
                const password = "zxc"
                const fields = { rollNum, studentName, password }
                loginUser(fields, user);
            } else {
                navigate('/Studentlogin');
            }
        } else if (user === "Teacher") {
            if (visitor === "guest") {
                const email = "tony@12"
                const password = "zxc"
                const fields = { email, password }
                loginUser(fields, user);
            } else {
                navigate('/Teacherlogin');
            }
        }
    }

    useEffect(() => {
        // Code to run after login state changes
        // For demonstration, nothing here
    }, []);

    return (
        <div className="container-fluid" style={{ background: '#2f3095', height: '100vh' }}>
            <div className="row h-100 justify-content-center ">
                <div className="col-sm-6 col-md-4 mt-5">
                    <div className="paper admin" >
                        <h2><FontAwesomeIcon icon={faUser} /> Admin</h2>
                        <p>Login as an administrator to access the dashboard to manage app data.</p>
                        <button className="btn-blue" onClick={() => navigateHandler("Admin")}>
                           Admin Portal
                        </button>
                    </div>
                </div>
                <div className="col-sm-6 col-md-4 mt-5">
                    <div className="paper student" >
                        <h2><FontAwesomeIcon icon={faUserGraduate} /> Student</h2>
                        <p>Login as a student to explore course materials and assignments.</p>
                        <button className="btn-blue" onClick={() => navigateHandler("Student")}>
                           Student Portal
                        </button>
                    </div>
                </div>
                <div className="col-sm-6 col-md-4 mt-5">
                    <div className="paper teacher" >
                        <h2><FontAwesomeIcon icon={faChalkboardTeacher} /> Teacher</h2>
                        <p>Login as a teacher to create courses, assignments, and track student progress.</p>
                        <button className="btn-blue" onClick={() => navigateHandler("Teacher")}>
                             Teacher Portal
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
