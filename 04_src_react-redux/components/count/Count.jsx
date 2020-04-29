import React, { Component } from 'react'

export default class Count extends Component {

  increment=()=>{
    // 获取select中值
    const {value}=this.refs.selectNode;
    this.props.increment(value*1);
  }
  decrement=()=>{
    // 获取select中值
    const {value}=this.refs.selectNode;
    this.props.decrement(value*1);
  }
  incrementOdd=()=>{
    const {value}=this.refs.selectNode;
    const {count}=this.props
    if(Math.abs(count % 2)===1){
      this.props.increment(value*1);
    }
  }
  incrementAsync=()=>{
    // 获取select中值
    const {value}=this.refs.selectNode;
    setTimeout(() => {
      this.props.increment(value*1);
    }, 500);
  }

  render() {
    return (
      <div>
        <div>点击了 {this.props.count} 次</div>
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
