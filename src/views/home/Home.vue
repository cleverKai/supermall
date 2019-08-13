  <template>
      <div id="home">
       <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
        <tab-control :titles="['流行','新款','精选']"
                     @tabClick="tabClick" ref="tabControl1"class="tab-control" v-show="isTabFixed"></tab-control>
        <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control :titles="['流行','新款','精选']"
                     @tabClick="tabClick" ref="tabControl2" ></tab-control>
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
              tabOffsetTop:0,
              isTabFixed:false,
              saveY:0,
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
          BackTop,


        },
      //生命周期函数，create，当组件创建完过后发送网络请求数据
       created() {
         //1.请求多个数据,返回的是promise,调用then方法
        this.getHomeMultidata();
         //2.请求商品数据
         this.getHomeGoods('pop');
         this.getHomeGoods('new');
         this.getHomeGoods('sell');
       },
      mounted(){

       // const refresh =  this.debounce(this.$refs.scroll.refresh,500)
        //当我的scroll.vue挂载完，才能拿到scroll对象
        //监听事件总线，监听item中的图片加载完成
        this.$bus.$on('itemImageLoad', () =>{
          this.$refs.scroll.refresh()
        })
      },
      destroyed(){
        console.log('destroyed');
      },
      //回到页面，将我离开时记录的位置拿到，迅速回到离开时的位置
      activated(){
        this.$refs.scroll.scrollTo(0,this.saveY,0)
        this.$refs.scroll.refresh();
      },
      //切换到其他页面，将我切换之前的高度记录，然后赋值给saveY
      deactivated(){
        this.saveY = this.$refs.scroll.scroll.y;
      },
      methods:{
            //封装防抖函数
            // debounce(func,delay){
            //   let timer = null;
            //
            //   return function () {
            //     if(timer){
            //       clearTimeout(timer)
            //     }
            //     timer = setTimeout(()=>{
            //       func.apply()
            //     },delay)
            //   }
            // },
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

          //完成的上拉加载更多
          this.$refs.scroll.finishPullUp()
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
          this.$refs.tabControl1.currentIndex = index;
          this.$refs.tabControl2.currentIndex = index;
        },
        backClick(){
          //拿到scroll组件对象,调用scrollTo方法,回到顶部
          this.$refs.scroll.scrollTo(0,0,500)
        },
        //监听滚动的距离
        contentScroll(position){
          //判断BackTop是否显示
          // position.y
          if(-(position.y)>1000){
            this.isShowBackTop = true
          }else {
            this.isShowBackTop = false
          }
          //2.决定tabControl是否吸顶（position:fixed）
           this.isTabFixed = (-position.y)>this.tabOffsetTop
        },
        // 监听上拉加载更多
        loadMore(){
          this.getHomeGoods(this.currentType)
        },
        swiperImageLoad(){
          //获取tabControl的offsetTop
          //所有的组件都有一个$el:获取组件中的元素
         this.tabOffsetTop =  this.$refs.tabControl2.$el.offsetTop
        }

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
    /*.tab-control{*/
    /*  position: sticky;*/
    /*  top: 44px;*/
    /*  z-index: 9;*/
    /*}*/
    .content{
      /*height: 300px;*/
      overflow: hidden;
      position: absolute;
      top: 44px;
      bottom: 49px;
      left: 0;
      right: 0;
    }
    .tab-control{
      position: relative;
      z-index: 9;
    }
    /*.content{*/
    /*  height: 300px;*/
    /*}*/
  </style>
