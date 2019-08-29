<template>
    <div class="goods-list-page">
      <navgation-bar
        @onLeftClick="onBackClick"
        :pageName="'商品列表'">
        <template v-slot:nav-right>
          <img
            :src="layoutType.icon"
            @click="onChangelayoutTypeClick()">
        </template>
      </navgation-bar>
      <div class="goods-list-page-content">
        <goods-options @optionsChange="onGoodsOptionsChange"></goods-options>
        <goods
          :layoutType="layoutType.type"
          :sort="sortType"
        >
        </goods>
      </div>
    </div>
</template>

<script>
import NavgationBar from '@c/currency/NavigationBar'
import GoodsOptions from '@c/goods/GoodsOptions'
import goods from '@c/goods/Goods'

export default {
  name: 'GoodsList',
  components: {
    NavgationBar,
    GoodsOptions,
    goods
  },
  data: function () {
    return {
      isIphoneX: window.isIphoneX,
      layoutTypeDatas: [
        {
          type: '1',
          icon: require('@img/list-type.svg')
        },
        {
          type: '2',
          icon: require('@img/grid-type.svg')
        },
        {
          type: '3',
          icon: require('@img/waterfall-type.svg')
        }
      ],
      layoutType: {},
      sortType: '1'
    }
  },
  created: function () {
    this.layoutType = this.layoutTypeDatas[0]
  },
  methods: {
    onBackClick: function () {
      this.$router.go(-1)
    },
    onChangelayoutTypeClick: function () {
      if (this.layoutType.type === '1') {
        this.layoutType = this.layoutTypeDatas[1]
      } else if (this.layoutType.type === '2') {
        this.layoutType = this.layoutTypeDatas[2]
      } else {
        this.layoutType = this.layoutTypeDatas[0]
      }
    },
    onGoodsOptionsChange: function (sortType) {
      this.sortType = sortType
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
