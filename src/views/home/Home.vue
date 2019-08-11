  <template>
      <div id="home">
       <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

        <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" >
        <home-swiper :banners="banners"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control class="tab-control" :titles="['流行','新款','精选']"
                     @tabClick="tabClick"></tab-control>
        <goods-list :goods = "goods[currentType].list"></goods-list>
        </scroll>
<!--        组件不能直接监听点击,监听组件的原生事件需要在前面后面.native-->
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top >
      </div>
  </template>

  <script>
    import HomeSwiper from './childComps/HomeSwiper'
    import RecommendView from './childComps/RecommendView'
    import FeatureView from './childComps/FeatureView'

    import NavBar from 'components/common/navbar/NavBar'
    import TabControl from 'components/content/tabControl/TabControl'
    import GoodsList from 'components/content/goods/GoodsList'
    import Scroll from 'components/common/scroll/Scroll'
    import BackTop from 'components/content/backTop/BackTop'
    //引入封装数据请求函数
    import {getHomeMultidata,getHomeGoods} from "../../network/home";
    export default {
          name: "home",
         //存储请求过来的数据
         data(){
            return{
              //定义result存储我请求过来的数据
              banners:[],
              recommends:[],
              //保存请求的商品列表信息
              goods:{
               'pop':{page: 0 ,list:[]},
               'new': {page: 0 ,list:[]},
               'sell':{page: 0 ,list:[]}
              },
              currentType:'pop',
              isShowBackTop:false,
            }
         },
        components:{
            NavBar,
          // eslint-disable-next-line vue/no-unused-components
           HomeSwiper,
          RecommendView,
          FeatureView,
          TabControl,
          GoodsList,
          Scroll,
          BackTop

        },
      //生命周期函数，create，当组件创建完过后发送网络请求数据
       created() {
         //1.请求多个数据,返回的是promise,调用then方法
        this.getHomeMultidata();
         //2.请求商品数据
         this.getHomeGoods('pop');
         this.getHomeGoods('new');
         this.getHomeGoods('sell');

         //监听事件总线，监听item中的图片加载完成
         this.$bus.$on('itemImageLoad', () =>{
           this.$refs.scroll.refresh()
         })
       },
      methods:{
        /**
         * 网络请求相关方法
         */
        getHomeMultidata() {
          getHomeMultidata().then(res => {
            // // eslint-disable-next-line no-console
            // console.log(res);
            // // this.result = res ;
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
          })
        },
        getHomeGoods(type){
          const page = this.goods[type].page + 1
          getHomeGoods(type,page).then((res)=>{
            //把从请求的数据里面的list全部保存到我新定义的goods对象里面的list数组
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          // this.$refs.scroll.finishPullUp()
          })
        },
        // tabcontrol事件监听
        tabClick(index){
          switch (index) {
            case 0:
              this.currentType = 'pop'
              break
            case 1:
              this.currentType ='new'
              break
            case 2:
              this.currentType = 'sell'
              break
          }
        },
        backClick(){
          //拿到scroll组件对象,调用scrollTo方法,回到顶部
          this.$refs.scroll.scrollTo(0,0,500)
        },
        //监听滚动的距离
        contentScroll(position){
          // position.y
          if(-(position.y)>1000){
            this.isShowBackTop = true
          }else {
            this.isShowBackTop = false
          }
        },
        //监听上拉加载更多
        // loadMore(){
        //   this.getHomeGoods(this.currentType)
        // }

      }
    }
  </script>

  <style scoped lang="css">
    #home{
      padding-top: 44px;
      /*vh视口*/
      height: 100vh;
      position: relative;
    }
    .home-nav{
      /*使用样式变量*/
      background-color:var(--color-tint);
      color: #fff;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 9;
    }
    .tab-control{
      position: sticky;
      top: 44px;
      z-index: 9;
    }
    .content{
      /*height: 300px;*/
      overflow: hidden;
      position: absolute;
      top: 44px;
      bottom: 49px;
      left: 0;
      right: 0;
    }
    /*.content{*/
    /*  height: 300px;*/
    /*}*/
  </style>
