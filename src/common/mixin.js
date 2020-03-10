import {debounce} from "./utils";

import BackTop from "components/context/backTop/BackTop";

//混入
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted() {
     this.refresh = debounce(this.$refs.scroll.refresh, 500)

    this.itemImgListener = () => {
      this.refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    // console.log('我是混入内容');
  }
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
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
