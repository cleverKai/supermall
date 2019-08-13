<template>
  <div id="app">
<!--    阻止销毁-->
     <keep-alive exclude="Detail">
       <router-view></router-view>
     </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
  import MainTabBar  from  'components/content/mainTabbar/MainTabBar'
  export default {
    name: 'app',
    //注册引用的组件
    components:{
      MainTabBar
    }
  }
</script>

<style>
  /*导入样式*/
@import "assets/css/base.css";
</style>
