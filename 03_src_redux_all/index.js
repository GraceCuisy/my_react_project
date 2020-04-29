import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import store from "./redux/store";

ReactDOM.render(<App/>,document.getElementById('root'));
// 如果redux中保存的状态发生变化,就调用store.subscribe所指定的回调
store.subscribe(()=>{
  ReactDOM.render(<App/>,document.getElementById('root'));
})