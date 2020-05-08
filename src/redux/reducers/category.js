// 加工分类数据的reducer
import { SAVE_CATEGORY } from "../action_types";

let initState=[];
export default function(preState=initState,action){
  let newState;
  const {type,data}=action;
  switch (type) {
    case SAVE_CATEGORY:
      newState=[...data].reverse(); 
      return newState;
    default:
      return preState;
  }
}