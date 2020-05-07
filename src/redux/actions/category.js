// 此文件是创建category相关的action的action creator
import { message } from "antd";
import { SAVE_CATEGORY } from "../action_types";
import { reqCategoryList } from "@/api";

// 保存分类信息的同步action
export const saveCategory=(categoryList)=>({type:SAVE_CATEGORY,data:categoryList})
// 保存分类信息的异步action
export const saveCategoryAsync=()=>{
  return async (dispatch)=>{
    // 异步任务
    const result=await reqCategoryList()
    const {status,data,msg}=result;
    if(status===0){
      // 请求成功,分发一个同步action
      dispatch(saveCategory(data));
    }else{
      // 如果失败,弹窗提醒
      message.error(msg);
    }
  }
}