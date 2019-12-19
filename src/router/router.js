import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Loadable from 'react-loadable'

// import Login from '../components/Login/index';
import App from '../Layout';
// import Layout from '../Layout';

function Loadables (fun) {
  return Loadable({
    loader: fun,
    loading: () => { return (<div>loading</div>) }
  });
}
const Login = Loadables(() => import('../components/Login/index'));

const BasicRoute = () => (
  <HashRouter>
    <Route exact path="/" component={App}>
      {/* <Route path="/index" component={Login} /> */}
      {/* <Route path="inbox" component={App}>
        <Route path="messages/:id" component={App} />
      </Route> */}
    </Route>

    <Route
      path='/login'
      component={Login}
    />
  </HashRouter>
);


export default BasicRoute;