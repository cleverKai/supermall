<template>
    <div class="bottom-bar">
     <div class="check-content">
       <check-button @click.native="checkClick" :is-checked="isSelectAll" class="check-button"></check-button>
       <span>全选</span>
     </div>
      <div class="total-price">
         合计:{{totalPrice}}
      </div>

      <div class="calculate">
        去结算({{ checkLength}})
      </div>
    </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
    export default {
        name: "CartBottomBar",
      components:{
        CheckButton
      },
      computed:{
        totalPrice(){
          return "￥"+ this.$store.state.cartList.filter((item) =>{
            return item.checked
          }).reduce(( preValue, item ) =>{
           return preValue+item.price * item.count
          },0).toFixed(2)
        },
        checkLength(){
          return this.$store.state.cartList.filter((item) => item.checked).length
        },
        isSelectAll(){
        // return !(this.$store.state.cartList.filter((item) => !item.checked).length)
          if(this.$store.state.cartList.length ===0){
            return false
          }
          return  !this.$store.state.cartList.find((item) => !item.checked)
        }
      },
      methods:{
        checkClick(){
          // console.log("-----");
          if(this.isSelectAll){//全部选中
            this.$store.state.cartList.forEach((item) => item.checked = false)
          }else{//部分或者全部不选中
            this.$store.state.cartList.forEach((item) => item.checked = true)
          }
        }
      }
    }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    height: 44px;
    background-color: #eee;
    display: flex;
  }
  .check-content{
    display: flex;
    align-items: center;
    line-height: 44px;
    margin-left: 10px;
  }
  .check-button{
    width:20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .total-price{
    line-height: 44px;
    margin-left: 20px;
    color: orangered
  }
  .calculate{
    line-height: 44px;
    position: absolute;
    right: 0;
    background-color: #f69;
    color: #fff;
    width: 90px;
    text-align: center;
    font-size: 14px;
  }
</style>
