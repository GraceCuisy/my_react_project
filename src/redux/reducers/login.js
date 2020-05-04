// 向外暴露一个专门用来操作用户信息的函数
import { SAVE_USERINFO,DELETE_USERINFO } from "../action_types";

// 当初始化的时候先尝试从local中去拿数据,如果没有再指定一个初始值
// 如果用户改坏了local中的user信息,那么用JSON.parse去解析时会报错 try catch
let _user;
let _token;
try {
  _user=JSON.parse(localStorage.getItem('user'));
} catch (error) {
  _user={};
}
_token=localStorage.getItem('token'); 

let user=_user || {};  //如果local中没有对应的值,取出来为null;
let token=_token || '';
/* 维护一个isLogin值,代表用户是否登录;去判断local中是否同时具有user和token,
   数据在用户手里,用户可以随意更改
   如果不是,就不能让用户在admin页面,如果是登录,就不能再让用户去登录页面 */
let isLogin=_user && _token ? true:false;
let initValue={user,token,isLogin}
export default function (preState=initValue,action) {
  const {type,data}=action;
  let newState;
  switch (type) {
    case SAVE_USERINFO: //保存用户信息,说明是登录的
      newState={...data,isLogin:true};
      return newState;
    case DELETE_USERINFO: 
    newState={};
    return newState;
    default:
      return preState;
  }
}