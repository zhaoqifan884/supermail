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
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {

      })
    }
  }
</script>

<style scoped>

</style>
