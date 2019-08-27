<template>
    <div class="goods-list-page">
      <navgation-bar @onLeftClick="onBackClick" :pageName="'商品列表'"></navgation-bar>
      <div class="goods-list-page-content">
        <goods-options></goods-options>
      </div>
    </div>
</template>

<script>
import NavgationBar from '@c/currency/NavigationBar'
import GoodsOptions from '@c/goods/GoodsOptions'
// import goods from '@c/goods/goods'
export default {
  name: 'GoodsList',
  components: {
    NavgationBar,
    GoodsOptions
  },
  methods: {
    onBackClick: function () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/css/style.scss';
  .goods-list-page {
    height: 100%;
    width: 100%;
    background-color: $bgColor;
    display: flex;
    flex-direction: column;
    position: absolute;
    &-content {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
</style>
