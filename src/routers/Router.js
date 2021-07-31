import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import TestPageMain from '../pages/TestPageMain';
import TestPageLogin from '../pages/TestPageLogin';

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
    <Router exact to="">
      <TestPageLogin />
    </Router>
    <Router exact to="account">
      <TestPageMain />
    </Router>
  </>
);
export default Routers;
