//该组件是一个高阶组件，用于根据登录状态，检查传递过来的组件，是否可以被看到。
// 高阶组件接收一个组件,返回一个新组件
/* 
	规则：
		1.如果没有登录，但是要看是非login，不允许。
		2.如果已经登录，但是要看的是login，不允许。
*/
import React,{Component} from "react";
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

export default function(CurrentComponent){
  @connect(
    state=>({isLogin:state.userInfo.isLogin})
  )
  class TargetComponent extends Component{
    render(){
      const {isLogin}=this.props;
      const {pathname}=this.props.location;
      if(isLogin && pathname==='/login') return <Redirect to="/admin"/>
      if(!isLogin && pathname !=='/login') return <Redirect to="/login"/>
      // 如果不是这两种情况,就把原本的组件返回,但是要把外边容器组件传进来的this.props给UI组件再传过去
      return <CurrentComponent {...this.props}/>
    }
  }
  return TargetComponent
}
