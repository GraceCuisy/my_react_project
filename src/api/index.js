// 用来统一管理项目中的ajax请求 

import ajax from './ajax'; 

// 请求登录函数 loginObj 就是传过来的values,格式 {username:xxx,password:xxx}
export const reqLogin =(loginObj)=> ajax.post('/login',loginObj);