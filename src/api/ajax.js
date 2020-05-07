/* 该文件是对axios这个库的二次封装，完成：
		1.配置请求的基础路径
		2.配置超时时间
		3.统一处理post请求json编码问题（转为urlencoded）
		4.统一返回真正的数据data，而不是response对象
    5.统一处理错误 
*/
import axios from "axios";
import Nprogress from 'nprogress';
import "nprogress/nprogress.css";
import qs from "querystring";
import { message as msg } from 'antd';
import store from "@/redux/store";
import { deleteUserInfo } from "@/redux/actions/login";
import { saveTitle } from "@/redux/actions/title";

axios.defaults.baseURL='http://localhost:3000/api';
// axios.defaults.baseURL='/api';
axios.defaults.timeout=2000;

/* axios的请求拦截器
   统一处理post请求json编码问题(转为urlencoded)
*/
axios.interceptors.request.use((config)=>{
  // 如果有token,每次发请求都要携带token 普通的一个js文件要和redux打交道,需要使用最原始的方式
  const {token}=store.getState().userInfo
  if(token){
    config.headers.Authorization=`atguigu_${token}`
  }
  // 请求进度条的开始
  Nprogress.start();
  const {method,data}=config;
  if(method.toLowerCase()==='post' && data instanceof Object){
    config.data=qs.stringify(data);
  }
  return config;
})

axios.interceptors.response.use(
  // 成功的回调
  response=>{
    Nprogress.done();
    return response.data;
  },
  // 失败的回调
  error=>{
    Nprogress.done();
    let errmsg='未知错误,请联系网站管理人员';
    const {message} =error;
    if(message.indexOf('401') !==-1){
      errmsg='未登录或身份过期,请重新登录'
      // 强制到登录页面
      store.dispatch(deleteUserInfo());
      store.dispatch(saveTitle(''));

    }
    else if(message.indexOf('Network Error')!==-1) errmsg="网络不通"
    else if(message.indexOf('timeout')!==-1) errmsg="网络不稳定,链接超时"
    msg.error(errmsg);
    // 返回一个pending状态的Promise,就会在响应拦截器中统一处理错误,后续就不用处理错误了
    return new Promise(()=>{})
  }
)

export default axios;