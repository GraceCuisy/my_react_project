import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import store from "./redux/store";
import { Provider } from "react-redux";

/* Provider是包在最外面的顶级组件,需要给它传入store对象,
以便每个组件中都能得到store的状态和dispatch方法
如果不传,在Count容器组件中react-redux去调用mapStateToProps方法时
就不能拿到state和dispatch*/
ReactDOM.render(
          <Provider store={store}>
              <App/>
          </Provider>,
          document.getElementById('root'));