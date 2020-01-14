import React from 'react';
import { Button, Icon } from 'antd';

let MenuIcon = {
  // backgroundColor: 'red',
  color: 'white',
  fontSize: 40,
  
}
export default class Header extends React.Component {
  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render () {
    return (
      <div>
        <div style={MenuIcon}>
          <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
          </Button>
        </div>
      </div>
    )
  }
}
