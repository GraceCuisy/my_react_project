import React, { Component } from 'react'
import { Menu} from 'antd';
import { Link,withRouter } from "react-router-dom";
import { connect } from "react-redux";
import menus from "@/config/menu_config";
import Logo from "@/assets/images/logo.png";
import "./css/left_nav.less";
import { saveTitle } from "@/redux/actions/title";

const { SubMenu,Item } = Menu;

@connect(
  state=>({}), //映射状态
  {saveTitle} //映射操作状态的方法
)
@withRouter
class LeftNav extends Component {
  saveNavTit=(title)=>{
    // console.log(title);
    this.props.saveTitle(title);
  }

  // 创建菜单的函数
  createMenu=(menuArr)=>{
    return menuArr.map((menuObj)=>{
      if(!menuObj.children){ //如果菜单项没有子菜单
        return (
          <Item key={menuObj.key} onClick={()=>{this.saveNavTit(menuObj.title)}}>
            <Link to={menuObj.path}>
              <menuObj.icon/>{menuObj.title}
            </Link>
          </Item>
        )
      }else{ //如果菜单项有子菜单
        return (
          <SubMenu key={menuObj.key} icon={<menuObj.icon />} title={menuObj.title}>
              {this.createMenu(menuObj.children)}
          </SubMenu>
        )
      }
    })
  }

  calculateTitle=()=>{
    // 在这个函数中根据浏览器地址栏的最后的key计算出应该显示的标题并且存入redux
    const {pathname}=this.props.location;
    let currentKey=pathname.split('/').slice(-1)[0];
    // 用户第一次登录时
    if(currentKey==='admin') currentKey='home'
    // 去配置项中匹配,找到对应标题,注意区分item 和submenu
    let title='';
    menus.forEach((menuObj)=>{
      if(menuObj.children instanceof Array){
        // 可以展开的菜单项,要去它的孩子中找路径对应的标题
        let result=menuObj.children.find((childObj)=>{
          return currentKey===childObj.key
        })
        if(result) title=result.title;
      }else{
        // 普通菜单项
        if(currentKey===menuObj.key) title=menuObj.title;
      }
      // 将标题存入redux
      this.props.saveTitle(title);
    })
  }
  componentDidMount(){
    // 页面刷新之后，或初始化挂载时会调用下面函数
    this.calculateTitle();
  }

  render() {
    console.log("---leftNav 进行render了");
    const {pathname}=this.props.location;
    const checkedkeyArr=pathname.split('/').slice(-1);
    const openkeysArr=pathname.split('/') //没有做筛选,不需要做筛选
    return (
      <div className="left-nav">
        <div className="left-nav-top">
          <img src={Logo} alt="导航图标"/>
          <span>商品管理系统</span>
        </div>
        {/* 以下是antd的menu组件 */}
          <Menu
            selectedKeys={checkedkeyArr} //默认选中的菜单
            defaultOpenKeys={openkeysArr} //默认展开的菜单
            mode="inline" //行内式菜单
            theme="dark" //主题颜色
          >
          {this.createMenu(menus)}
          </Menu>
      </div>
    )
  }
}
export default LeftNav;
