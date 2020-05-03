import React, { Component } from 'react';
import { reqLogin } from "@/api";
import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import Logo from "./images/logo.png";
import "./css/Login.less";

const {Item}=Form;

export default class Login extends Component {
  // 表单提交的回调 values是帮你收集的表单输入项的对象
  onFinish = async (values) => {
   const result=await reqLogin(values)
   console.log('成功了',result);
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
