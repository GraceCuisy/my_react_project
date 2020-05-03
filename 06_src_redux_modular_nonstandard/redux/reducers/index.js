// 这个文件是专门用来汇总个个组件的reducer,返回一个总的reducer
import { combineReducers } from "redux";
import countReducer from "./count";
import personReducer from "./person";

// combineReducers是一个函数,函数接收state状态对象,返回值是总reducer

export default combineReducers({
  count:countReducer,
  person:personReducer,
})
