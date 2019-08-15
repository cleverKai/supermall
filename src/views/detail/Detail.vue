<template>
    <div id="detail">
     <detail-nav-bar class="detail-nav" ref="nav" @titleClick="titleClick"></detail-nav-bar>
      <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detailInfo="detailInfo" @detailImageLoad="detailImageLoad"></detail-goods-info>
        <detail-param-info ref="param" :paramInfo="paramInfo"></detail-param-info>
        <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
        <goods-list ref="recommend" :goods="recommends"></goods-list>
      </scroll>
      <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
      <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'


  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "../../network/detail";
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import GoodsList from 'components/content/goods/GoodsList'
  import DetailBottomBar from './childComps/DetailBottomBar'
  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      BackTop,
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        // 标题到我指定区域的y值
        themeTopYs: [],
        currentIndex: 0,
        isShowBackTop: false,
      }
    },
    created() {
      //拿到路由里面商品的iid
      this.iid = this.$route.params.iid

      //2.根据iid请求详情数据
      getDetail(this.iid).then((res) => {
        // console.log(res);
        const data = res.result
        //1.获取顶部的轮播图片
        this.topImages = data.itemInfo.topImages;

        //获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
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
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })

      //请求推荐商品数据
      getRecommend(this.iid).then((res) => {
        console.log(res);
        this.recommends = res.data.list
      })
    },
    mounted() {

    },
    updated() {
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
    methods: {
      //图片加载问题解决
      detailImageLoad() {
        this.$refs.scroll.refresh();
        this.themeTopYs = [];
        //商品的offsetTop
        this.themeTopYs.push(0);
        //评论的offsetTop
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        //参数的offsetTop
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        //推荐的offsetTop
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      },
      titleClick(index) {
        console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
      },
      contentScroll(position) {
        // console.log(position);
        //获取y值
        const positionY = -position.y;
        //用positionY与主题中的y值对比，从而决定显示那个title
        //[0,7938,9120,9652]
        //positionY 在0和7938 index=0
        //positionY 在7938和9120 index=0
        //positionY 在9120和96528 index=0
        //positionY 在7938之后 index=0
        //遍历themeTopYs
        let length = this.themeTopYs.length;
        for (let i = 0; i < this.themeTopYs.length; i++) {
          // console.log(i);
          // if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]){
          //   console.log(i);
          // }
          if (this.currentIndex !== i && (i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY >= this.themeTopYs[i])) {
            // console.log(i);
            this.currentIndex = i;
            // console.log(this.currentIndex);
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }
      },
      contentScroll(position) {
        //判断BackTop是否显示
        // position.y
        if (-(position.y) > 1000) {
          this.isShowBackTop = true
        } else {
          this.isShowBackTop = false
        }
        //2.决定tabControl是否吸顶（position:fixed）
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      backClick() {
        //拿到scroll组件对象,调用scrollTo方法,回到顶部
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      //加入都购物车
      //1.获取购物车需要展示的商品信息
      addToCart() {
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        //2.将商品添加到购物车里面
        this.$store.dispatch("addCart",product);
        // console.log("***");
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
    height: calc(100% - 44px - 49px);
  }
</style>
