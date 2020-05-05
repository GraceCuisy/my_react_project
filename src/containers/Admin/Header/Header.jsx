import React, { Component } from 'react'
import screenfull from "screenfull";
import { connect } from "react-redux";
import { deleteUserInfo } from "@/redux/actions/login";
import './css/header.less'
import { Button,Modal } from 'antd';
import {
          FullscreenOutlined,
          FullscreenExitOutlined,
          ExclamationCircleOutlined
       } from '@ant-design/icons';
import demo from './demo.jpg';

const { confirm } = Modal;

@connect(
  state=>({//映射状态
    username:state.userInfo.user.username,
  }), 
  {deleteUserInfo} //映射操作状态的方法
)
class Header extends Component {
  state={
    isFull:false, //要定义一个状态控制图标的切换,让按钮的全屏切换改变状态值
  }

  fullScreen=()=>{
    /* 点击按钮操作全屏与否的回调
    */
    screenfull.toggle();
  }

  componentDidMount(){
    // 检测全屏切换的回调
    screenfull.onchange(() => {
      const {isFull}=this.state;
      this.setState({isFull:!isFull});
    });
  }
  // 退出登录 用antd模拟一个确认框
  logout=()=>{
    confirm({
      title: '你确定退出登录吗?',
      cancelText:'取消',
      okText:'确定',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk:()=>{
        this.props.deleteUserInfo();
      },
      onCancel:()=>{
      },
    });
  }

  render() {
    return (
      <div>
        <div className="header-top">
          <Button size='small' onClick={this.fullScreen}>
            {this.state.isFull ? <FullscreenExitOutlined />:<FullscreenOutlined/>}
            </Button>
          <span> 欢迎,{this.props.username}</span>
          <Button type='link' onClick={this.logout}>退出登录</Button>
        </div>
        <div className="header-bottom">
          <div className="header-b-l">首页</div>
          <div className="header-b-r">
            <span>2020年 05月04日 22:56:30</span>
            <img src={demo} alt=""/>
            <span>多云转晴 温度:17~10℃</span>
          </div>
        </div>
      </div>
    )
  }
}
export default Header;
