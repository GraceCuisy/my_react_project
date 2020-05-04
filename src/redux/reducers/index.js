// 该文件用于汇总所有的reducer
import { combineReducers } from "redux";
import loginReducer from "./login";

export default combineReducers({
  userInfo:loginReducer,
})