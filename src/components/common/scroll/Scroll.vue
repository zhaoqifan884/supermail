<template>
  <div class="wrapper" ref="wrapper">
<!--    ref / childern    获取子组件-->
<!--    ref如果是绑定在组件中的，那么通过this.$ref.refname获取到是一个组件对象-->
<!--    ref如果是绑定在普通元素中的，那么通过this.$ref.refname获取到是一个元素对象-->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      }/*,
      pullUpLoad: {
        type: Boolean,
        default: false
      }*/
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      //1.创建Bscroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        //probeType=3 施行监听  在各组件中处理即可
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      //2.监听滚动位置
      this.scroll.on('scroll', position => {
        // console.log(position);
        this.$emit('scroll',position)
      })
      // console.log(this.scroll);
      /*//3.监听上拉事件
      this.scroll.on('pullingUp', () => {
        // console.log('上拉加载更多');
        this.$emit('pullingUp')
      })*/
    },
    methods: {
      scrollTo(x, y, time=300) {
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>
