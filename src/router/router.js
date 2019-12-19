import React from "react";
import { HashRouter, Route } from "react-router-dom";

import Login from '../components/Login/index';
import App from '../Layout';

const BasicRoute = () => (
  <HashRouter>
    <Route path="/" component={App} />
    <Route
      path='/login'
      component={Login}
    />
  </HashRouter>
);


export default BasicRoute;