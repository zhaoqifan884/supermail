<template>
  <div id="cart">
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  //vuex提供方法，可以直接将vuex中getters的方法转成计算属性使用
  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar
    },
    computed: {
     ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
  .cart-nav {
    background-color: var(--color-tint);
    color: antiquewhite;
  }
</style>
