import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid';

export default class Person extends Component {
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
