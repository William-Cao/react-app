
import React, { Component } from 'react'
import { Layout } from 'antd';

import CommonSlider from "./components/Common/Slider";//导航
import CommonHeader from "./components/Common/Header";//头部
import CommonRouter from './components/Common/Content'//内容

// console.log(CommonSlider)
const { Header, Content, Sider } = Layout;


class LayoutBox extends Component {
  renderLayout () {
    return (
      <Layout>
        <Header className="header">
          <CommonHeader />
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <CommonSlider />
          </Sider>
          <Layout style={{ padding: '24px' }}>
            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <CommonRouter />
            </Content>
          </Layout>
        </Layout>
      </Layout >
    )
  }
  render () {
    return (
      <div className="container">
        {this.renderLayout()}
      </div>
    )
  }
}

export default LayoutBox

