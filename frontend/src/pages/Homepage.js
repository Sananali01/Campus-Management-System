import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import HomePage from "../assets/picture.jpg";
import '../CSS/Homepage.css';


const Homepage = () => {
    return (
        <div className="container-fluid homepage-container">
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 homepage-image">
                    <img src={HomePage} alt="HomePage" className="img-fluid animated" />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 homepage-content">
                    <div className="content-inner">
                        <h1>Welcome to Campus Management System</h1>
                        <p>
                            Simplify campus management for smoother operations. Improve class organization to enhance teaching and learning experiences. Ensure seamless integration of students and faculty members into the system. Effortlessly monitor attendance to keep track of who's present. Access records with ease to stay updated on academic information.
                        </p>
                        <p>
                            Empower your institution with our comprehensive system designed to streamline administrative tasks and enhance educational outcomes.
                        </p>
                        <div className="cta-buttons">
                            <Link to="/choose" className="btn btn-purple btn-lg">
                                <FontAwesomeIcon icon={faSignInAlt} /> Login
                            </Link>
                            <Link to="/Adminregister" className="btn btn-outline-purple btn-lg">
                                <FontAwesomeIcon icon={faUserPlus} /> Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
