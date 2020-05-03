/* 这个文件要暴露一个专门为person组件服务的reducer,*/
  import { ADD_PERSON } from "../action_type";
  const initValue=[{id:'001',name:'老刘',age:20},
                   {id:'002',name:'渊哥',age:32}];

  export default function (preState=initValue,action){
    let newState;
    const {type,data}=action;
    switch (type) {
      case ADD_PERSON:
        newState=[data,...preState];
        break;
      default:
        newState=preState;
        // console.log('初始化调用reducer',preState,action);
        break;
    }
    return newState;
  }