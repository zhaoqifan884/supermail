<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <feature-view/>
    <tab-control class="tab-control" :titles="['流行', '新款', '精选']"/>

    <ul>
      <li>hahaha</li>
      <li>hahaha</li>
      <li>hahaha</li>
      <li>hahaha</li>
      <li>hahaha</li>
      <li>hahaha</li>
      <li>hahaha</li>
      <li>hahaha</li><li>hahaha</li><li>hahaha</li>
      <li>hahaha</li>
      <li>hahaha</li>
      <li>hahaha</li><li>hahaha</li>
      <li>hahaha</li>
      <li>hahaha</li>
      <li>hahaha</li>
      <li>hahaha</li>
      <li>hahaha</li>
      <li>hahaha</li>
      <li>hahaha</li>
      <li>hahaha</li>
      <li>hahaha</li>
      <li>hahaha</li>
      <li>hahaha</li><li>hahaha</li><li>hahaha</li>
      <li>hahaha</li>
      <li>hahaha</li>
      <li>hahaha</li>
      <li>hahaha</li>

    </ul>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/context/tabControl/TabControl";

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";
  //只有default导出时，才能省略{}
  import {getHomeMultidata} from "network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,

      HomeSwiper,
      RecommendView,

      FeatureView
    },
    data() {
      return {
        banners: [],
        recommends: []
      }
    },
    //当首页创建完之后，发送网络请求
    created() {
      // 1.创建多个数据   (加（）表示调用函数)
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    }

  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    /*height: 100vh;*/
    /*position: relative;*/
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control {
    position: sticky;
    top: 44px;
  }

</style>
