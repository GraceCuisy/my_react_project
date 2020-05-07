import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@/redux/store";
import App from './App';

ReactDOM.render(
  // 用上了provider,只要redux保存的状态发生了变化,页面都会重新刷新
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'));