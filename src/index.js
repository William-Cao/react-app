import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router/router';

// IE polyfill
import 'core-js/es'
import 'mutation-observer'
import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";

import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import './assets/components.less';

ReactDOM.render(
  <Router />,
  document.getElementById('root')
);

serviceWorker.unregister();
