import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} component={(props) => {
        const isLogin = sessionStorage.getItem("__xyz__")
        if (isLogin) {
            return <Component {...props} />
        } else {
            return <Redirect to="/signin-page" />
        }
    }} />
}

export default PrivateRoute;