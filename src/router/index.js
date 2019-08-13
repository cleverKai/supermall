import  Vue from 'vue'
import VueRouter from 'vue-router'
//对相关组件进行懒加载
const  Home = () => import('../views/home/Home')
const  Category = () => import('../views/category/Category')
const  Cart = () => import('../views/cart/Cart')
const  Profile = () => import('../views/profile/Profile')
const  Detail = () => import('../views/detail/Detail')
 //1.安装VueRouter
Vue.use(VueRouter)
//创建路由对象,配置路由信息
const  routes = [
  //2.配置路由映射关系
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component: Category
  },
  {
    path: '/cart',
    component:Cart
  },
  {
    path:'/profile',
    component: Profile
  },
  {
    path:'/detail/:iid',
    component:Detail
  },


]
//3. 创建路由对象
const  router = new VueRouter({
    routes,
    mode: 'history',
});
//4. 导出路由
export default  router
