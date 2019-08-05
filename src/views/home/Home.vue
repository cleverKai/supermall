  <template>
      <div id="home">
       <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
        <home-swiper :banners="banners"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control class="tab-control" :titles="['流行','新款','精选']"></tab-control>
        <goods-list :goods = "goods['pop'].list"></goods-list>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
  </template>

  <script>
    import HomeSwiper from './childComps/HomeSwiper'
    import RecommendView from './childComps/RecommendView'
    import FeatureView from './childComps/FeatureView'

    import NavBar from 'components/common/navbar/NavBar'
    import TabControl from 'components/content/tabControl/TabControl'
    import GoodsList from 'components/content/goods/GoodsList'
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
              }
            }
         },
        components:{
            NavBar,
          // eslint-disable-next-line vue/no-unused-components
           HomeSwiper,
          RecommendView,
          FeatureView,
          TabControl,
          GoodsList

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
      methods:{
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
          })
        }
      }
    }
  </script>

  <style scoped lang="css">
    #home{
      padding-top: 44px;
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
    }
  </style>
