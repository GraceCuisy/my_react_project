import React, { Component } from 'react'
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom'

class Admin extends Component {
  render() {
    // 如果没有登录,就不能停留在admin,要去login
    if(!this.props.isLogin) {
      return <Redirect to='/login'/>
    }
    return (
      <div>
        欢迎 {this.props.userName}
      </div>
    )
  }
}

export default connect(
  state=>({
    userName:state.userInfo.user.username,
    isLogin:state.userInfo.isLogin
  }),  //映射状态
  {} //映射操作状态的方法
)(Admin)