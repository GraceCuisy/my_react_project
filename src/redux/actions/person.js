/* 该文件是专门用来创建和person有关的action对象的
  每一个action对象通过一个函数生成,外面调用对应的函数生成对应的action对象
  分别暴露多个函数
*/
import { ADD_PERSON } from "../action_type";

export const addPerson= personObj => ({type:ADD_PERSON,data:personObj});
