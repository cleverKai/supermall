
export default {
  //mutations修改state中的状态
  //mutations中完成的事情尽可能比较单一
  addCounter(state,payload){
    payload.count++;
  },
  addToCart(state,payload){
    state.cartList.push(payload);
  }
}
  

