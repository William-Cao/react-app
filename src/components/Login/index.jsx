import React from 'react';
// import ReactDOM from 'react-dom';

export default class Login extends React.Component {
  render () {
    return (
      <div>
        <a href='#/detail'>去detail</a>
        <button onClick={() => this.props.history.push('detail')}>123</button>
      </div>
    )
  }
}