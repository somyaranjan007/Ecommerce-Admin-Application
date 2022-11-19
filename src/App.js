import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// admin components
import Home from './components/js/Home';
import PrivateRoute from './components/HOC/PrivateRoute';
import Banner from './components/js/Banner';
import Category from './components/js/Category';
import Products from './components/js/Products';
import Signin from './components/js/Signin';
import SigninForm from './components/js/SigninForm';
import Orders from './components/js/Orders';
import ScrollTop from './components/js/ScrollTop';


// actions
import { isAdminLogin } from './actions/LoginAction';
import { getAllCategory } from './actions/CategoryAction';
import { showProducts } from './actions/ProductAction';
import { getBanner } from './actions/BannerAction';


function App() {

  const { authenticate } = useSelector((state) => state.login)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!authenticate) {
      dispatch(isAdminLogin())
    }
    if (authenticate) {
      dispatch(getAllCategory());
      dispatch(showProducts());
      dispatch(getBanner());
    }

  }, [authenticate])

  return (
    <Router>

      <ScrollTop />
      <Switch>

        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/banner" component={Banner} />
        <PrivateRoute path="/category" component={Category} />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/orders" component={Orders} />

        <Route path="/signin-page" component={Signin} />
        <Route path="/signin" component={SigninForm} />

      </Switch>

    </Router>
  );
};

export default App;
