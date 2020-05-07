import React, { Component } from 'react'
import screenfull from "screenfull";
import { connect } from "react-redux";
import dayjs from 'dayjs';
import {reqWeatherData} from '@/api'
import { deleteUserInfo } from "@/redux/actions/login";
import { saveTitle } from "@/redux/actions/title";
import { Button,Modal } from 'antd';
import {
          FullscreenOutlined,
          FullscreenExitOutlined,
          ExclamationCircleOutlined
       } from '@ant-design/icons';
import './css/header.less'
const { confirm } = Modal;

@connect(
  state=>({//映射状态
    username:state.userInfo.user.username,
    title:state.title,
  }), 
  {deleteUserInfo,saveTitle} //映射操作状态的方法
)
class Header extends Component {
  state={
    isFull:false, //要定义一个状态控制图标的切换,让按钮的全屏切换改变状态值
    time:dayjs(Date.now()).format('YYYY年 MM月DD日 HH:mm:ss'),
    weatherData:{}
  }

  fullScreen=()=>{
    /* 点击按钮操作全屏与否的回调
    */
    screenfull.toggle();
  }

  getWeatherData=async ()=>{
    const res=await reqWeatherData();
    const {dayPictureUrl,temperature,weather} =res.results[0]["weather_data"][0];
    this.setState({weatherData:{dayPictureUrl,temperature,weather}})
  }

  componentDidMount(){
    // 检测全屏切换的回调
    screenfull.onchange(() => {
      const {isFull}=this.state;
      this.setState({isFull:!isFull});
    });
    // 设置一个循环定时器,每隔一秒,让状态中的时间更新一次
    this.timer=setInterval(() => {
      this.setState({time:dayjs(Date.now()).format('YYYY年 MM月DD日 HH:mm:ss')})
    }, 1000);
    // 在Header组件一挂载就去请求天气数据
    this.getWeatherData();


  }
  // 在组件即将死亡时,清除更新时间的定时器
  componentWillUnmount(){
    clearInterval(this.timer);
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
        this.props.saveTitle('');
      },
      onCancel:()=>{
      },
    });
  }

  render() {
    const {dayPictureUrl,temperature,weather}=this.state.weatherData
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
          <div className="header-b-l">{this.props.title}</div>
          <div className="header-b-r">
            <span>{this.state.time}</span>
            <img src={dayPictureUrl} alt=""/>
            <span>{weather} 温度:{temperature}</span>
          </div>
        </div>
      </div>
    )
  }
}
export default Header;
