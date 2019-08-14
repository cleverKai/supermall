<template>
    <div id="detail">
     <detail-nav-bar class="detail-nav" ref="nav" @titleClick="titleClick"></detail-nav-bar>
      <scroll class="content" ref="scroll">
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detailInfo="detailInfo" @detailImageLoad="detailImageLoad"></detail-goods-info>
        <detail-param-info ref="param" :paramInfo="paramInfo"></detail-param-info>
        <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
        <goods-list ref="recommend" :goods="recommends"></goods-list>
      </scroll>
    </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "../../network/detail";
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import Scroll from 'components/common/scroll/Scroll'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import GoodsList from 'components/content/goods/GoodsList'
  export default {
        name: "Detail",
      components:{
          DetailNavBar,
         DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
      },
      data(){
          return{
           iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[],
            // 标题到我指定区域的y值
            themeTopYs:[],
          }
      },
      created() {
          //拿到路由里面商品的iid
         this.iid = this.$route.params.iid

        //2.根据iid请求详情数据
        getDetail(this.iid).then((res)=>{
          // console.log(res);
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

          //获取参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
          console.log(this.paramInfo);

          //取出评论信息
          if(data.rate.cRate !== 0){
            this.commentInfo = data.rate.list[0]
          }
        })

        //请求推荐商品数据
        getRecommend(this.iid).then((res) =>{
          console.log(res);
          this.recommends = res.data.list
        })
      },
    mounted(){

    },
    updated(){
      //     this.themeTopYs = [];
      // //商品的offsetTop
      // this.themeTopYs.push(0);
      // //评论的offsetTop
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop );
      // //参数的offsetTop
      // this.themeTopYs.push(this.$refs.param.$el.offsetTop );
      // //推荐的offsetTop
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    },
    methods:{
      //图片加载问题解决
      detailImageLoad(){
        this.$refs.scroll.refresh();
        this.themeTopYs = [];
        //商品的offsetTop
        this.themeTopYs.push(0);
        //评论的offsetTop
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop );
        //参数的offsetTop
        this.themeTopYs.push(this.$refs.param.$el.offsetTop );
        //推荐的offsetTop
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      },
      titleClick(index){
        console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200);
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
