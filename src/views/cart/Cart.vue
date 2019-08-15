<template>
    <div class="cart">

<!--      导航-->
      <nav-bar class="nav-bar">
        <div slot="center" class="cart">购物车({{length}})</div>
      </nav-bar>

<!--      商品的列表-->
      <cart-list></cart-list>


<!--      底部汇总-->

    </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar'
  import {mapGetters} from 'vuex'

  import CartList from './childComps/CartList'
    export default {
        name: "cart",
      components:{
        NavBar,
        CartList
      },
      computed:{
          //两种语法
         // ...mapGetters(["cartLength","cartList"])
        ...mapGetters({
          length:"cartLength",
        })
      }
    }
</script>

<style scoped>
 .nav-bar {
   background-color: var(--color-tint);
   color: #fff;
   font-weight: 500;
 }
 .cart{
   height: 100vh;
 }
</style>
