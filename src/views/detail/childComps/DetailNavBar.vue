<template>
    <div>
      <nav-bar>
        <div slot="left" class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
        <div slot="center" class="title">
          <div v-for="(item,index) in titles" class="title-item" :class="{active:index===currentIndex}" @click="titleClick(index)">{{item}}</div>
        </div>
      </nav-bar>
    </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
    export default {
        name: "DetailNavBar",
      data(){
          return{
           titles:["商品","参数","评论","推荐"],
            currentIndex:0,
          }
      },
      components:{
        NavBar
      },
      methods:{
        titleClick(index){
          this.currentIndex = index
          //向外发出点击事件
          this.$emit("titleClick",index);
        },
        backClick(){
          this.$router.go(-1)
        }
      }
    }
</script>

<style scoped>
  .back img{
    margin-top: 12px;
  }
 .title{
   display: flex;
   font-size: 12px;
 }
  .title-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
</style>
