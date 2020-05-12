import React from 'react';

import { createHashHistory } from 'history';
const history = createHashHistory();

export default class utils extends React.Component {
}

utils.routerJump = function (params) {
  history.push(params);
}