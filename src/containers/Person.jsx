/* Count组件的容器组件,用来和redux打交道 */

// 引入react的核心库
import React, { Component } from 'react'
// 引入uuid
import { v4 as uuidv4 } from 'uuid';
// 2.引入核心的connect方法
import { connect } from "react-redux";
import {addPerson} from "../redux/actions/person";

// Person的UI组件
class Person extends Component {
  add=()=>{
    // 获取输入框的值,
    const {nameNode,ageNode}=this.refs;
    // 验证
    if(!nameNode.value || !ageNode.value){
      alert('输入不能为空')
    }
    // 加人
    this.props.addPerson({
      id:uuidv4(),
      name:nameNode.value,
      age:ageNode.value,
    })
    // 清空输入
    nameNode.value='';
    ageNode.value='';
  }

  render() {
    const {person,number}=this.props;
    return (
      <div>
        <h1>当前总人数为:{person.length}--上方求和为:{number}</h1>
        <input ref="nameNode" type="text" placeholder="输入名字"/>
        <input ref="ageNode" type="text" placeholder="输入年龄"/>
        <button onClick={this.add}>添加</button>
        <ul>
          {
            person.map((personObj)=>{
            return <li key={personObj.id}>name:{personObj.name}===age:{personObj.age}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

// 3.向外暴露容器对象
export default connect(
  state=>({
    person:state.person,
    number:state.count,
  }), //一般不传方法时也最好留一个空对象
  {addPerson})(Person);