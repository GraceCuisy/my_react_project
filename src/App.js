import React, { Component } from 'react'
import {Route,Switch,Redirect} from "react-router-dom";
import Login from "./containers/Login/Login";
import Admin from "./containers/Admin/Admin"

export default class App extends Component {
  render() {
    return (
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/admin" component={Admin}/>
          <Redirect to="/login"/>
        </Switch>
    )
  }
}

//装饰器语法总结：

//情况一：装饰器函数没有return(必须是程序员写代码的return)
/* function demo(target) {
	target.a = 1
	target.b = 2
}

//使用装饰器语法，代码如下:
// @demo
// class MyClass {}

// console.log(MyClass.a)
// console.log(MyClass.b)
//上方的装饰器语法，会被翻译为如下代码：
class MyClass {}
demo(MyClass) 

console.log(MyClass.a)
console.log(MyClass.b) */
/****************************************************************/

//情况二：装饰器函数有返回值
/* function demo(target) {
		target.a = 1
		target.b = 2
		return {c:3,...target}
} */
//使用装饰器语法，代码如下
// @demo
// class MyClass {}

// console.log('@@',MyClass);
// console.log(MyClass.a)
// console.log(MyClass.b)

//上方的装饰器语法，会被翻译为如下代码:
// class MyClass {}
// MyClass = demo(MyClass)

/****************************************************************/

//情况三：装饰器函数是另外一个函数的返回值
// function test(){
// 	function demo(target) {
// 		target.a = 1
// 		target.b = 2
// 		return target
// 	}
// 	return demo
// }

// 使用装饰器语法，代码如下
/* @test()
class MyClass {}

console.log('@@',MyClass);
console.log(MyClass.a)
console.log(MyClass.b)

//上方的装饰器语法，会被翻译为如下代码:
class MyClass {}
MyClass = test()(MyClass) */


/*

	编译器配置：
		第一步：安装：@babel/plugin-proposal-decorators
		第二步：更改：config-overrides.js文件，添加一个addDecoratorsLegacy
		第三步：jsconfig.js文件，compilerOptions中追加："experimentalDecorators": true

 */
