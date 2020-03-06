<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content" ref="scroll"
            :probe-type="3" @scroll="contentScroll"
            :pull-up-load="true">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control class="tab-control"
                   :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>
<!--    组件不能直接监听点击，需要加.native(原生的)-->
<!--    原生组件可以随意监听-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/context/tabControl/TabControl";
  import GoodsList from "components/context/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/context/backTop/BackTop";

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  //只有default导出时，才能省略{}
  import {
    getHomeMultidata,
    getHomeGoods
  } from "network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,

      HomeSwiper,
      RecommendView,

      FeatureView
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        //，默认展示pop
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    //当首页创建完之后，发送网络请求
    created() {
      // 1.创建多个数据   (加（）表示调用函数)
      this.getHomeMultidata()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

      //3.监听item中图片加载完成
      this.$bus.$on('itemImageLoad', () => {
        // console.log('------------');
        this.$refs.scroll.refresh()
      })
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      tabClick(index) {
        switch (index) {
          case 0 :
            this.currentType = 'pop'
            break
          case 1 :
            this.currentType = 'new'
            break
          case 2 :
            this.currentType = 'sell'
            break
        }
        // console.log(index);
      },
      /**
       * scroll监听滚动的位置
       * backtop显示/隐藏
       */
      contentScroll(position) {
        // console.log(position);
        this.isShowBackTop = (-position.y) > 1000
      },
      /*loadMore() {
        // console.log('上拉加载更多');
        this.getHomeGoods(this.currentType)

        //解决better-scroll bug ，因为better-scroll会一直处理默认原始高度的滚动，要对其现有的高度实时更新
        //先监听图片什么时候加载完，在实时更新滚动高度
        // this.$refs.scroll.scroll.refresh()
      },*/

      /**
       * 网络请求相关方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          /*console.log(res);
          res.data().list*/
          //对res.data().list中的元素做一个解析，在塞到goods中
          this.goods[type].list.push(...res.data.list)
          //因为type多了一组数据，所以页码必须加一
          this.goods[type].page += 1

          // this.$refs.scroll.finishPullUp()
        })
      },
      /**
       * 回到顶部
       */
      backClick() {
        // console.log('回到顶部');
        //scrollTo(0,0) 返回（0,0）的位置 在500ms之内回到顶部
        this.$refs.scroll.scrollTo(0,0)
      }
    }

  }
</script>
<!--scoped 属性只会对当前页面起效果-->
<style scoped>
  #home {
    /*content样式一时关闭 padding-top*/
    padding-top: 44px;
    /*vh --> 视口高度  100vh ---> 100% 的视口*/
    /*样式2时打开*/
    height: 100vh;
    /*相对定位*/
    position: relative;
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
    z-index: 9;
  }

  /* 样式一*/
  /*.content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  }*/
  /*样式2*/
  .content {
    overflow: hidden;
    /*绝对定位*/
    position: absolute;
    /*顶部高度*/
    top: 44px;
  /*  底部高度*/
    bottom: 49px;
    left: 0;
    right: 0;
  }

</style>
