// 此文件是专门用于操作用户信息的action
import { SAVE_USERINFO } from "../action_types";

export const saveUserInfo= userObj => {
  const {user,token}=userObj;
  // 保存数据到local中
  localStorage.setItem('user',JSON.stringify(user));
  localStorage.setItem('token',token);
  return {type:SAVE_USERINFO,data:userObj}
}