import React, { Component } from 'react'
import { connect } from "react-redux";
import Header from "./Header/Header";
import { Layout } from 'antd';
import "./css/admin.less"
import Check from "../Hoc/Check";
const { Footer, Sider, Content } = Layout;

@connect(
  state=>({
    // userName:state.userInfo.user.username,
    isLogin:state.userInfo.isLogin
  }),  //映射状态
  {} //映射操作状态的方法
)
@Check
class Admin extends Component {
  render() {
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
export default Admin;
