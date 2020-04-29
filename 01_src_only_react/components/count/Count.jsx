import React, { Component } from 'react'

export default class Count extends Component {

  state={
    count:0,
  }
  increment=()=>{
    // 获取select中值
    const {value}=this.refs.selectNode;
    let {count}=this.state;
    // 让count值加value 输入类型的标签value都是文本
    count+=value*1;
    // 将count值设置到状态中去;
    this.setState({count})
  }
  decrement=()=>{
    // 获取select中值
    const {value}=this.refs.selectNode;
    let {count}=this.state;
    // 让count值减value 输入类型的标签value都是文本
    count -= value*1;
    // 将count值设置到状态中去;
    this.setState({count})
  }
  incrementOdd=()=>{
    const {value}=this.refs.selectNode;
    let {count}=this.state;
    if(count % 2===1){
      count+=value*1;
      this.setState({count})
    }
  }
  incrementAsync=()=>{
    // 获取select中值
    const {value}=this.refs.selectNode;
    let {count}=this.state;
    // 让count值加value 输入类型的标签value都是文本
    count+=value*1;
    setTimeout(() => {
      this.setState({count})
    }, 500);
  }

  render() {
    return (
      <div>
        <div>点击了 {this.state.count} 次</div>
        <br/>
        <select ref="selectNode">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementOdd}>increment if odd</button>&nbsp;
        <button onClick={this.incrementAsync}>increment async</button>
      </div>
    )
  }
}
