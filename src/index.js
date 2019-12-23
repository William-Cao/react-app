import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router/router';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';

ReactDOM.render(
  <Router/>,
  document.getElementById('root')
);

serviceWorker.unregister();
