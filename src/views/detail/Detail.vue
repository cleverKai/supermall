<template>
    <div id="detail">
     <detail-nav-bar class="detail-nav"></detail-nav-bar>
      <scroll class="content" ref="scroll">
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      </scroll>
    </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import {getDetail,Goods,Shop} from "../../network/detail";
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import Scroll from 'components/common/scroll/Scroll'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  export default {
        name: "Detail",
      components:{
          DetailNavBar,
         DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo
      },
      data(){
          return{
           iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
          }
      },
      created() {
          //拿到路由里面商品的iid
         this.iid = this.$route.params.iid

        //2.根据iid请求详情数据
        getDetail(this.iid).then((res)=>{
          console.log(res);
          const data = res.result
          //1.获取顶部的轮播图片
          this.topImages = data.itemInfo.topImages;

          //获取商品信息
          this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
          // console.log(this.goods);

          //创建店铺信息的对象
          this.shop = new Shop(data.shopInfo)
          console.log(this.shop)
          //保存商品的详情数据

          this.detailInfo = data.detailInfo;
        })
      },
    methods:{
      imageLoad(){
        this.$refs.scroll.refresh();
      }
    }
    }
</script>

<style scoped>
   #detail{
     position: relative;
     z-index: 9;
     background-color: #fff;
     height: 100vh;
   }
   .detail-nav{
     position: relative;
     z-index: 9;
     background-color: #fff;
   }
  .content{
    height: calc(100% - 44px);
  }
</style>
