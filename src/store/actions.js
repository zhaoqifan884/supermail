import {ADD_COUNTER, ADD_TO_CART} from "./mutations-types";

export default {
  addCart(context,payload) {
    //payload 新添加的商品
    //查找数组中是否有该商品
    //方法一
    /* let oldProduct = null
     for(let item of state.cartList) {
       if (item.iid === payload.iid) {
         oldProduct = item
       }
     }*/
    //方法二
    let oldProduct = context.state.cartList.find(item => {
      item.iid === payload.iid
    })
    //判断oldProduct
    if (oldProduct) {
      // oldProduct.count += 1
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1
      // state.cartList.push(payload)
      context.commit(ADD_TO_CART,payload)
    }

  }
}
