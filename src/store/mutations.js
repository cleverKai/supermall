
export default {
  //mutations修改state中的状态
  //mutations中完成的事情尽可能比较单一
  addCounter(state,payload){
    payload.count++;
  },
  addToCart(state,payload){
    //当添加到购物车里面该商品被选中
    payload.checked = true;
    state.cartList.push(payload);
  }
}
  

