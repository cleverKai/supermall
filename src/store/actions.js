export  default {
  addCart(context,payload,){
    //payload新添加的商品
    //查找数组中是否了该商品
    let oldProduct = context.state.cartList.find( (item) =>{
      return item.iid === payload.iid;
    })
    //2.判断oldProduct
    if(oldProduct){
      // oldProduct.count +=1
      context.commit("addCounter",oldProduct);
    }else {
      payload.count = 1;
      // context.state.cartList.push(payload);
      context.commit("addToCart",payload)
    }
  }
}
