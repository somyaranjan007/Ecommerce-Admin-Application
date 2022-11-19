import React from 'react';
import '../css/Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogout } from '../../actions/LoginAction';

const Navbar = () => {
    const loginState = useSelector((state) => state.login)
    const dispatch = useDispatch()

    const signOut = () => {
        dispatch(adminLogout())
    }

    return (
        <div className="navbar-main-box">
            <div className="navbar-heading">Admin Panel</div>
            {
                loginState.authenticate ? <button onClick={signOut} className="navbar-logout-button">Signout</button> : null
            }
        </div>
    );
};

export default Navbar;
