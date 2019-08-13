import {request} from "./request";

export function getDetail(iid) {
  return request({
    url: '/detail',
    params:{
      iid
    }
  })

  }

  //商品详情的所有属性定义成一个类
 export class Goods {
   constructor (itemInfo,columns,services){
     this.title = itemInfo.title
     this.desc = itemInfo.desc;
     this.newPrice = itemInfo.price
     this.oldPrice = itemInfo.oldPrice
     this.discount = itemInfo.discountDesc
     this.columns = columns
     this.services = services
     this.realPrice = itemInfo.lowNowPrice
   }
 }
 //对店铺详情数据进行封装
export class Shop {
  constructor(shopInfo){
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}
