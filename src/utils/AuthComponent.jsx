// 组件包装器
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export let AuthComponent = ComposedComponent =>class WrapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: window.permissions && window.permissions.indexOf(this.props.auth)>-1,
    };
  }

  componentDidMount(){
    if (!window.permissions) {
      //请将这里的url替换成你自己目标url，并按照你的返回数据格式解析
      // axios.get("sys/menu/user")
      //   .then((response) => {
      //     //permissions是你从服务端返回的权限列表
      //     window.permissions = response.permissions;
      //     this.setState({isShow: window.permissions && window.permissions.indexOf(this.props.auth)>-1});
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    }
  }

  static propTypes = {
    auth:PropTypes.string.isRequired,
  };

  render() {
    //如果权限有值，并且具备权限，那么创建按钮
    return this.state.isShow?<ComposedComponent { ...this.props} />:null;
  }
};




//定义组件，页面引用
// const AuthButton = AuthComponent(Button);

// export default class DemoPage extends Component {
// constructor(props) {}
// render() {
//    return <AuthButton auth="user:add" type="primary" onClick={this.dosomething}>新增用户</AuthButton>
//   }
// }