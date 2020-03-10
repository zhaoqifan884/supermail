<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
<!--      属性：topImages   传值：top-images-->
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import BScroll from 'components/common/scroll/Scroll'
  import GoodsList from "components/context/goods/GoodsList";
  // import BackTop from "components/context/backTop/BackTop";

  import {getDetail, Goods, GoodsParam,Shop,getRecommend} from "network/detail";
  import {itemListenerMixin, backTopMixin} from "common/mixin";
  import Scroll from "components/common/scroll/Scroll";
  import {debounce} from "common/utils";

  export default {
    name: "Detail",
    components: {
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      BScroll,
      GoodsList,
      // BackTop
    },
    //混入
    mixins: [itemListenerMixin, backTopMixin],

    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopsYs: [],
        getThemeTopY: null,
        currentIndex: 0

      }
    },
    created() {
      //1.保存传入的iid(动态id)
      this.iid = this.$route.params.iid
      //1.保存传入的iid(query)
      // this.iid = this.$route.query.iid
      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        //1.获取顶部图片轮播数据
        const data = res.result
        this.topImages = data.itemInfo.topImages
        //2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //3.创建店铺信息对象
        this.shop = new Shop(data.shopInfo)
        //4.保存商品的详情数据
        this.detailInfo = data.detailInfo
        //5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //6.取出评论信息
        if (data.rate.cRate != 0) {
          // console.log(data.rate.list[0]);
          this.commentInfo = data.rate.list[0]
        }
        //当页面完全渲染时，会调用$nextTick(),才能保证拿到的数据都有值
        // this.$nextTick(() => {
        //   //根据最新的数据，对应的dom已经被渲染出来了，但图片依然没有加载完(目前获取到的offsetTop不包含图片)
        //
        // })
        /**
         * 哪里才能正确的获取offsetTop
         * 1.created肯定不行，压根不行获取元素
         * 2.mounted也不行，数据还没有获取到
         * 3.获取到数据用回调也不行，因为dom还没渲染完
         * 4.this.$nextTick也不行，因为图片高度没有被计算
         * 5.只有用了防抖函数在图片加载完成后，获取的高度才是正确
         */
      })

      //3.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
        // console.log(typeof res.data.list);
      })

      //4.给getThemeTopY赋值(给this.themeTopsYs赋值操作进行防抖)
      //防抖的目的提高性能，不到对一个操作过于频繁操作   可用于处理图片加载问题
      this.getThemeTopY = debounce(() => {
        this.themeTopsYs = []

        this.themeTopsYs.push(0)
        this.themeTopsYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopsYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopsYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopsYs.push(Number.MAX_VALUE)

        // console.log(this.themeTopsYs);
      },100)
    },
    mounted() {
    },
    destroyed() {
      //2.取消全局事件监听
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    methods: {
      imageLoad() {
        this.refresh()
        this.getThemeTopY()
      },
      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopsYs[index], 500)
      },
      contentScroll(position) {
        // console.log(position);
        //1.获取y
        const positionY = -position.y
        //2.position和主题中的值进行对比
        //[0 , 7938, 9120, 9452, 无穷大]
        //positionY在[0,7938] index=0
        //positionY在[7938,9120] index=1
        //positionY在[9120,9452] index=2
        //positionY在大于9452 index=3 （最后一层不需要遍历）
       let length = this.themeTopsYs.length
        for(let i = 0; i < length-1; i++) {
          //方法一
          /*if (this.currentIndex != i && (i < length - 1 && positionY >= this.themeTopsYs[i] && positionY < this.themeTopsYs[i+1])
            || (i === length - 1 && positionY >= this.themeTopsYs[i])){
            this.currentIndex = i
            // console.log(this.currentIndex);
            this.$refs.nav.currentIndex = this.currentIndex
          }*/
          //方法二
          if (this.currentIndex != i && (positionY >= this.themeTopsYs[i] && positionY < this.themeTopsYs[i+1])){
            this.currentIndex = i

            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        //4.是否显示回到顶部
        this.isShowBackTop = -position.y > 1000
      },
      addToCart() {
        // console.log('----------');
        //1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        //2.将商品添加到购物车
        // this.$store.commit('addCart',product)
        this.$store.dispatch('addCart',product)
      }

    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    /*相对定位*/
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>
