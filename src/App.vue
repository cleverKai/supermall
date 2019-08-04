<template>
  <div id="app">
     <router-view></router-view>
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
