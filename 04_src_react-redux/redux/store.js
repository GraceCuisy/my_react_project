/* 该文件是创建一个redux中最为核心的store对象,并且暴露出去
  store对象是一个具备很多api方法的对象,我们自己还没办法定义
  需要使用redux的方法定义

  "每一个老板在开业之初就找好了自己的大厨"
*/

import {createStore} from "redux";
import countReducer from "./reducers/count";
export default createStore(countReducer);
