import React, { Component } from 'react'
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom'
import "./css/admin.less"
import Header from "./Header/Header";
import { Layout } from 'antd';
const { Footer, Sider, Content } = Layout;
class Admin extends Component {
  render() {
    // 如果没有登录,就不能停留在admin,要去login
    if(!this.props.isLogin) {
      return <Redirect to='/login'/>
    }
    return (
      <Layout className="admin">
        <Sider>Sider</Sider>
        <Layout>
          <Header/>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default connect(
  state=>({
    // userName:state.userInfo.user.username,
    isLogin:state.userInfo.isLogin
  }),  //映射状态
  {} //映射操作状态的方法
)(Admin)