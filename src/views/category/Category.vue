<template>
  <div id="category">
    <nav-bar class="category-nav">
      <div slot="center">商品分类</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "Category",
    components: {
      NavBar
    }
  }
</script>

<style scoped>
  .category-nav {
    background-color: var(--color-tint);
    color: antiquewhite;
  }
</style>
