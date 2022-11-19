import React from 'react';
import '../css/Signin.css';
import { Link, Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';

const Sigin = () => {
    const loginState = useSelector((state) => state.login)

    if (loginState.authenticate) {
        return <Redirect to="/" />
    }
    return (
        <>
            <Navbar />
            <div className="signin-main-box">
                <div className="signin-box">
                    <p>Ecommerce Admin Panel helps you to Manage everything on your Ecommerce Store. Use a single dashboard to manage orders, shipping, and payments anywhere you go. </p>
                    <Link to="/signin"><button className="sigin-button">Signin</button></Link>
                </div>
            </div>
        </>
    );
};

export default Sigin;
