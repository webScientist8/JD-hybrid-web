<template>
    <div class="shopping">
      <navigation-bar :pageName="'购物车'" :isShowBack="false"></navigation-bar>
      <h1>11111111111</h1>
    </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar'
export default {
  name: 'shopping',
  components: {
    NavigationBar
  },
  data: function () {
    return {
      shoppingDatas: this.$store.state.shoppingDatas
    }
  }

}
</script>

<style lang="scss" scoped>
  .shopping{
    width: 100%;
    height: 100%;
    font-size: 32px;
  }
</style>
