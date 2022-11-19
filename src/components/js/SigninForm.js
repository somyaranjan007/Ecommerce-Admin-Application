import React, { useState } from 'react';
import '../css/SigninForm.css';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin, loginErrorRemove } from '../../actions/LoginAction';
import ErrorHandle from './ErrorHandle';
import { BiUser } from 'react-icons/bi';
import { MdLockOutline } from 'react-icons/md';


const SigninFrom = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState()

    const dispatch = useDispatch()

    const loginState = useSelector((state) => state.login)

    const formHandle = (e) => {
        e.preventDefault()

        dispatch(adminLogin(email, password))
    }

    if (loginState.authenticate) {
        return <Redirect to="/" />
    }

    return (
        <div className="login-main-box">
            <div className="login-form">
                <h3>Login</h3>
                <form onSubmit={formHandle}>

                    <div className="login-email-password-div">
                        <BiUser style={{ marginRight: '-20px' }} />
                        <input type="email" className="login-input" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="login-email-password-div">
                        <MdLockOutline style={{ marginRight: '-20px' }} />
                        <input type="password" className="login-input" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} required /> <br />
                    </div>

                    <button>Login</button>
                </form>
            </div>
            {/* <h5>Forgot your Password</h5> */}

            {/* calling ErrorHandle() function component to show alert */}
            {
                <ErrorHandle error={loginState.error} removeAction={loginErrorRemove} />
            }
        </div>
    );
};

export default SigninFrom;
