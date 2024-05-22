import React from 'react';
import { Link } from 'react-router-dom';
import HomePage from "../assets/picture.jpg";
import '../CSS/Homepage.css'

const Homepage = () => {
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="row">
                <div className="col-md-6 homepage-image">
                    <img src={HomePage} alt="HomePage" className="img-fluid" />
                </div>
                <div className="col-md-6">
                    <div className="p-4">
                        <h1 className="mb-4">Welcome to Campus Management System</h1>
                        <p style={{ textAlign: "justify" }}>
                            Simplify Campus management for smoother operations. Improve class organization to enhance teaching and learning experiences. Ensure seamless integration of students and faculty members into the system. Effortlessly monitor attendance to keep track of who's present. Access records with ease to stay updated on academic information.
                        </p>
                        <p>bht maza aye ga </p>
                        <div className="mb-3">
                            <Link to="/choose" className="btn btn-purple btn-block">
                                Login
                            </Link>
                        </div>
                        <p>
                            Don't have an account?{' '}
                            <Link to="/Adminregister" className="text-purple">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;