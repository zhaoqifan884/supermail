import {debounce} from "./utils";

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
