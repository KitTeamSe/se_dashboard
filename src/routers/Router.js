import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TestPageMain from '../pages/TestPageMain';
import TestPageLogin from '../pages/TestPageLogin';
import TestAccountMainPage from '../pages/TestAccountMainPage';

const LoginRouter = ({ exact, to, children }) => (
  <Route
    exact={exact}
    path={`/${to}`}
    key={to}
    render={() =>
      !localStorage.getItem('token') ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: `/`
          }}
        />
      )
    }
  />
);

const Router = ({ exact, to, children }) => (
  <Route
    exact={exact}
    path={`/${to}`}
    key={to}
    render={() =>
      localStorage.getItem('token') ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: `/login`
          }}
        />
      )
    }
  />
);

const Routers = () => (
  <>
    <LoginRouter exact to="login">
      <TestPageLogin />
    </LoginRouter>
    <Router exact to="">
      <TestPageMain />
    </Router>
    <Router to="account">
      <TestAccountMainPage />
    </Router>
  </>
);
export default Routers;
