// 加工导航标题的reducer
import { SAVE_TITLE } from "../action_types";

let initState='首页';
export default function(preState=initState,action){
  let newState;
  const {type,data}=action;
  switch (type) {
    case SAVE_TITLE:
      newState=data; //字符串是基本类型,不需要断开引用了
      return newState;
    default:
      return preState;
  }
}