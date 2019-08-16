export  default {
  addCart(context,payload,){
    //payload新添加的商品
    //查找数组中是否了该商品
    return new Promise((resolve,reject) =>{
      let oldProduct = context.state.cartList.find( (item) =>{
        return item.iid === payload.iid;
      })
      //2.判断oldProduct
      if(oldProduct){
        // oldProduct.count +=1
        context.commit("addCounter",oldProduct)
        resolve("当前商品数量+1啦")
      }else {
        payload.count = 1;
        // context.state.cartList.push(payload);
        context.commit("addToCart",payload)
        resolve("已经添加到购物车啦")
      }
    })

  }
}
