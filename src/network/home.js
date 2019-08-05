//对首页数据的全部请求
import {request} from "./request";
 export  function getHomeMultidata() {
   return request({
     url:'/home/multidata'
   })
 }
