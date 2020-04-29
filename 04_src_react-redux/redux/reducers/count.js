/* 这个文件要暴露一个专门为count组件服务的reducer,
   reducer调用时机: init update
   reducer是一个函数,接收一个previousState和action,
   返回给store一个新的state状态
   action {type:'increment',data:1}
   */
import { INCREMENT,DECREMENT } from "../action_type";
// 初始化时,store是不会传preState,并且action只有type属性,值为"initxxx"
// 此时preState指定一个默认值是0;
const initValue=0;
export default function (preState=initValue,action){
  let newState;
  const {type,data}=action;
  switch (type) {
    case INCREMENT:
      // console.log('increment调用reducer',preState,action);
      newState=preState+data;
      break;
    case DECREMENT:
      newState=preState-data;
        // console.log('decrement调用reducer',preState,action);
        break;
    default:
      newState=preState;
      // console.log('初始化调用reducer',preState,action);
      break;
  }
  return newState;
}