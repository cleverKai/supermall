<template>
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
      name: "Scroll",
      props: {
        probeType: {
          type: Number,
          default: 0
        },
        pullUpLoad:{
          type:Boolean,
          default:false
        },
      },
      data() {
        return {
          scroll: null
        }
      },
      mounted() {
        //1.创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper, {
          //当被scroll组件包裹的组件里面有div的点击事件，必须在这里传入click：true,否则里面的点击事件会失效
          click: true,
          probeType: this.probeType,
         pullUpLoad :this.pullUpLoad
        }),
          //2.监听滚动区域
          this.scroll.on('scroll', (position) => {
            this.$emit('scroll', position)
          })
        //3.监听上拉事件
        this.scroll.on('pullingUp', () =>{
          this.$emit('pullingUp')
        })

      },
          methods: {
          scrollTo(x, y, time)
          {
            this.scroll.scrollTo(x, y, time)
          },
            //结束当前上拉加载更多，才能继续的上拉加载更多
          finishPullUp(){
          this.scroll.finishPullUp()
          }
        }


      }
</script>

<style scoped>

</style>
