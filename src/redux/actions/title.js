// 此文件是创建title相关的action的action creator

import { SAVE_TITLE } from "../action_types";
// 保存标题的同步action
export const saveTitle=(title)=>({type:SAVE_TITLE,data:title})