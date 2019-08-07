<template>
    <div class="goods">
      <goods-list-item v-for="item in  goods" :goods-item="item"></goods-list-item >
    </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'
    export default {
        name: "GoodsList",
        props:{
          goods: {
            type: Array,
            default() {
              return []
            }
          }
      },
      components:{
        GoodsListItem
      }
    }
</script>

<style scoped>
   .goods{
     /*根据每个宽度的大小来一行显示*/
     display: flex;
     flex-wrap: wrap;
     justify-content: space-around;
     padding: 2px;
   }
</style>
