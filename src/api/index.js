// 用来统一管理项目中的ajax请求 

import ajax from './ajax'; 
import jsonp from 'jsonp'
import {message} from 'antd'
import {CITY,WEATHER_AK} from '@/config'

// 请求登录函数 loginObj 就是传过来的values,格式 {username:xxx,password:xxx}
export const reqLogin =(loginObj)=> ajax.post('/login',loginObj);
// 使用jsonp请求天气信息
/* 解决在组件中拿到这个函数发送请求的返回值,不能直接用return,因为请求是异步的,return不会等请求的结果的,只能返回undefined
   但是promise和await的组合就可以了 请求函数中返回promise,promise中去发送异步请求, 组件中用await去等待,然后拿到服务器返回的成功的数据
*/
export const reqWeatherData=()=>{
  const URL=`http://api.map.baidu.com/telematics/v3/weather?location=${CITY}&output=json&ak=${WEATHER_AK}`
  return new Promise((resolve,reject)=>{
    jsonp(URL,{
      timeout:2000,
    },(err,data)=>{
      if(!err){
        // 请求成功
        resolve(data);
      }else{
        // 请求失败,直接弹框提示,也不用组件处理失败了
        message.error('请求天气数据失败,请联系网站管理员解决')
      }
    })
  })
}

// 获取商品分类数据
export const reqCategoryList =()=> ajax.get('/manage/category/list');
// 获取商品列表(分页)
export const reqProductList=(pageNum,pageSize)=> ajax.get('/manage/product/list',{params:{
  pageNum,
  pageSize
}})
// 搜索商品列表
export const reqSearch=(searchType,keyword,pageNum,pageSize)=> ajax.get('/manage/product/search',{params:{
  [searchType]:keyword,
  pageNum,
  pageSize
}})


