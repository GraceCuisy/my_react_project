import React, { Component } from 'react'
import {connect} from "react-redux";
import {Switch,Route,Redirect} from "react-router-dom";
import { Layout } from 'antd';
import Check from "../Hoc/Check";
import LeftNav from "./LeftNav/LeftNav";
import Header from "./Header/Header";
import Home from "./Home/Home";
import Category from "./Category/Category";
import Product from "./Product/Product";
import User from "./User/User";
import Role from "./Role/Role";
import Bar from "./Bar/Bar";
import Line from "./Line/Line";
import Pie from "./Pie/Pie";
import "./css/admin.less"
const { Footer, Sider, Content } = Layout;

@connect(
  state=>({}),  //映射状态
  {} //映射操作状态的方法
)
@Check
class Admin extends Component {
  render() {
    return (
      <Layout className="admin">
        <Sider>
          <LeftNav/>
        </Sider>
        <Layout>
          <Header/>
          <Content className='admin-content'>
            {/* 注册二级路由 */}
						<Switch>
							<Route path="/admin/home" component={Home}/>
							<Route path="/admin/prod_about/category" component={Category}/>
							<Route path="/admin/prod_about/product" component={Product}/>
							<Route path="/admin/user" component={User}/>
							<Route path="/admin/role" component={Role}/>
							<Route path="/admin/charts/bar" component={Bar}/>
							<Route path="/admin/charts/line" component={Line}/>
							<Route path="/admin/charts/pie" component={Pie}/>
							<Redirect to="/admin/home"/>
						</Switch>
					</Content>
          <Footer className="admin-footer">推荐使用谷歌浏览器，获取最佳用户体验</Footer>
        </Layout>
      </Layout>
    )
  }
}
export default Admin;
