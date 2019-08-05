<template>
    <div id="home">
     <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
    </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  //引入封装数据请求函数
  import {getHomeMultidata} from "../../network/home";
  export default {
        name: "home",
       //存储请求过来的数据
       data(){
          return{
            //定义result存储我请求过来的数据
            banners:[],
            recommends:[],
          }
       },
      components:{
          NavBar,
        // eslint-disable-next-line vue/no-unused-components
         HomeSwiper,
        RecommendView

      },
    //生命周期函数，create，当组件创建完过后发送网络请求数据
     created() {
       //1.请求多个数据,返回的是promise,调用then方法
       getHomeMultidata().then(res =>{
         // eslint-disable-next-line no-console
         console.log(res);
         // this.result = res ;
         this.banners = res.data.banner.list;
         this.recommends = res.data.recommend.list;
       })
     }
  }
</script>

<style scoped lang="css">
  .home-nav{
    /*使用样式变量*/
    background-color:var(--color-tint);
    color: #fff;
  }
</style>
