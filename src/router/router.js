import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import Login from '../components/Login/index';
import App from '../Layout';

const BasicRoute = () => (
  <HashRouter>
    <Switch>
      <Route path='/index' component={App} />
      <Route path='/login' component={Login} />
      <Redirect to='/index' />
    </Switch>
  </HashRouter>
);


export default BasicRoute;