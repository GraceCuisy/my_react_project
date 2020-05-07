import React, { Component } from 'react';
import { connect } from "react-redux";
import { saveUserInfo } from "@/redux/actions/login";
import { reqLogin } from "@/api";
import { Form, Input, Button,message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Check from '@/containers/Hoc/Check';
import Logo from "@/assets/images/logo.png";
import "./css/Login.less";

const {Item}=Form;

@connect(
  state=>({}), //映射状态
  {saveUserInfo} //映射操作状态的方法)
) 
@Check
class Login extends Component {
  componentDidMount(){
    console.log(this.props);
  }
  // 表单提交的回调 values是帮你收集的表单输入项的对象
  onFinish = async (values) => {
   const result=await reqLogin(values)
  // 判断服务器返回的状态码是1还是0
  const {user,token}=result.data;
  if(result.status===0){
    message.success('登录成功!',1);
    // 登录成功,跳转admin组件
    this.props.history.replace('/admin');
    // 登录成功之后,保存用户信息到redux和localStorage
    this.props.saveUserInfo({user,token});
  }else{
    message.error(result.msg);
  }
  };
  /*用户名/密码的的合法性要求
    1). 必须输入
    2). 必须大于等于4位
    3). 必须小于等于12位
    4). 必须是英文、数字或下划线组成 */
    // value是antd是底层帮你搜集的用户输入的值,但是默认是undefined
    psdValidator=(_,value='') => {
      const errorArr=[];
      if(!value.trim()) return Promise.reject('必须输入');
      if(value.length<4) errorArr.push('必须大于等于4位');
      if(value.length>12) errorArr.push('必须小于等于12位');
      if(!(/^\w+$/).test()) errorArr.push('必须是英文、数字或下划线组成');
      if(errorArr.length>0) return Promise.reject(errorArr);
      else return Promise.resolve();
    }
  render() {
    return (
      <div className='login'>
        <header>
          <img src={Logo} alt="indexlogo"/>
          <h1>商品管理系统</h1>
        </header>
        <section>
          <span>用户登录</span>
          <Form
            className="login-form"
            onFinish={this.onFinish}
          >
            <Item
              name="username"
              rules={[
                {required:true,message:'用户名必须输入'},
                {min:4,message:'必须大于等于4位'},
                {max:12,message:'不能超过12位'},
                {pattern:(/^\w+$/),message:'必须是英文、数字或下划线组成'}
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
            </Item>
            <Item
              name="password"
              rules={[
                {validator:this.psdValidator}
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Item>
          </Form>
        </section>
      </div>
    )
  }
}
//在UI组件渲染之前去检查能不能进行渲染, @connect包起来是为了和redux打交道
// Login1=Check(Login);
// connect()(Login1)
// connect包裹着的已经不是开始定义的Login了,而是Check函数的返回值了,

export default Login;