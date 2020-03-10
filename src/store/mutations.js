import {ADD_COUNTER, ADD_TO_CART} from "./mutations-types";

export default {
  //mutations唯一的目的就是修改states中的状态
  //mutations每个方法尽可能完成的事情比较单一 ，如果代码逻辑较复杂，直接放在action中处理
  //mutations可做跟踪
  [ADD_COUNTER](state,payload) {
    payload.count++
  },
  [ADD_TO_CART](state,payload) {
    state.cartList.push(payload)
  }
}
