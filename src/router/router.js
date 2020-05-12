import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import App from '../Layout';
import Login from '../components/Login/login';

const BasicRoute = () => (
  <HashRouter>
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/' component={App} />
      <Redirect to="/login" />
    </Switch>
  </HashRouter>
);

export default BasicRoute;