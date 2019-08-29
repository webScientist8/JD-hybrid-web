<template>
    <div class="goods"
         :class="[layoutClass, {'goods-scroll' : isScroll}]"
         :style="{height: goodsViewHeight}"
    >
      <div class="goods-item"
           :class="layoutItemClass"
           ref="goodsItem" v-for="(item, index) in sortGoodsData"
           :key="index"
           :style="goodsItemStyles[index]">
        <img class="goods-item-img" :src="item.img" alt="" :style="imgStyles[index]">
        <div class="goods-item-desc">
          <p class="goods-item-desc-name text-line-2" :class="{'goods-item-desc-name-hint' : !item.isHave}">
            <dirct v-if="item.isDirect"></dirct>
            <no-have v-if="!item.isHave"></no-have>
            {{item.name}}
          </p>
          <div class="goods-item-desc-data">
            <p class="goods-item-desc-data-price">￥{{item.price | priceValue}}</p>
            <p class="goods-item-desc-data-volume">销量：{{item.volume}}</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Dirct from '@c/goods/Direct'
import NoHave from '@c/goods/NoHave'
export default {
  name: 'Goods',
  components: {
    Dirct,
    NoHave
  },
  props: {
    sort: {
      type: String,
      default: '1'
    },
    layoutType: {
      type: String,
      default: '1'
    },
    isScroll: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      dataSource: [],
      MIN_IMG_HEIGHT: 178,
      MAX_IMG_HEIGHT: 230,
      imgStyles: [],
      // 1
      sortGoodsData: [],
      ITEM_MARGIN_SIZE: 8,
      goodsItemStyles: [],
      goodsViewHeight: '100%',
      layoutClass: 'goods-list',
      layoutItemClass: 'goods-list-item'
    }
  },
  created: function () {
    this.initData()
  },
  methods: {
    initData: function () {
      this.$http.get('/goods')
        .then(data => {
          this.dataSource = data.list
          // 设置布局
          this.initLayout()
          this.setSortGoodsData()
        })
    },
    setSortGoodsData: function () {
      switch (this.sort) {
        case '1':
          this.sortGoodsData = this.dataSource.slice(0)
          break
        case '1-2':
          this.getSortGoodsDataFromKey('price')
          break
        case '1-3':
          this.getSortGoodsDataFromKey('volume')
          break
        case '2':
          this.getSortGoodsDataFromKey('isHave')
          break
        case '3':
          this.getSortGoodsDataFromKey('isDirect')
          break
      }
    },
    getSortGoodsDataFromKey: function (key) {
      this.sortGoodsData.sort((goods1, goods2) => {
        let v1 = goods1[key]
        let v2 = goods2[key]
        if (typeof v1 === 'boolean') {
          if (v1) {
            return -1
          }
          if (v2) {
            return 1
          }
          return 0
        }
        if (parseFloat(v1) >= parseFloat(v2)) {
          return -1
        }
        return 1
      })
    },
    initLayout: function () {
      // 数据初始化
      this.goodsViewHeight = '100%'
      this.goodsItemStyles = []
      this.imgStyles = []
      // 监听
      switch (this.layoutType) {
        case '1':
          this.layoutClass = 'goods-list'
          this.layoutItemClass = 'goods-list-item'
          break
        case '2':
          this.layoutClass = 'goods-grid'
          this.layoutItemClass = 'goods-grid-item'
          break
        case '3':
          this.layoutClass = 'goods-waterfall'
          this.layoutItemClass = 'goods-waterfall-item'
          this.initImgStyles()
          this.$nextTick(() => {
            this.initWaterfall()
          })
          break
      }
    },
    imgHeight: function () {
      let result = Math.floor(Math.random() * (this.MAX_IMG_HEIGHT - this.MIN_IMG_HEIGHT) + this.MIN_IMG_HEIGHT)
      return result
    },
    initImgStyles: function () {
      this.dataSource.forEach(item => {
        let imgHeight = this.imgHeight() + 'px'
        this.imgStyles.push({
          height: imgHeight
        })
      })
    },
    initWaterfall: function () {
      let $goodsItems = this.$refs.goodsItem
      if (!$goodsItems) return
      let leftHeightTotal = 0
      let rightHeightTotal = 0
      $goodsItems.forEach(($el, index) => {
        let goodsItemStyle = {}
        let elHeight = $el.clientHeight + this.ITEM_MARGIN_SIZE

        if (leftHeightTotal <= rightHeightTotal) {
          goodsItemStyle = {
            left: '0px',
            top: leftHeightTotal + 'px'
          }
          leftHeightTotal += elHeight
        } else {
          goodsItemStyle = {
            right: '0px',
            top: rightHeightTotal + 'px'
          }
          rightHeightTotal += elHeight
        }
        this.goodsItemStyles.push(goodsItemStyle)
      })
      if (!this.isScroll) {
        this.goodsViewHeight = leftHeightTotal > rightHeightTotal ? leftHeightTotal : rightHeightTotal + 'px'
      }
    }
  },
  watch: {
    sort: function () {
      this.setSortGoodsData()
    },
    layoutType: function () {
      this.initLayout()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/css/style.scss';
  .goods {
    background-color: $bgColor;
      &-scroll {
        overflow: hidden;
        overflow-y: auto;
      }
    &-item {
      background-color: white;
      padding: $marginSize;
      box-sizing: border-box;
      &-desc {
        width: 100%;
        &-name {
          font-size: $infoSize;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-word;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          display: -webkit-box;
          line-height: px2rem(18);
          &-hint {
            color: $textHintColor;
          }
        }
        &-data {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: $marginSize;
          &-price {
            font-size: $titleSize;
            color: $mainColor;
            font-weight: 500;
          }

          &-volume {
            font-size: $infoSize;
            color: $textHintColor;
          }
        }
      }
    }
  }
  .goods-list {
    &-item {
      display: flex;
      border-bottom: 1px solid $lineColor;
      .goods-item-img {
        width: px2rem(120);
        height: px2rem(120);
      }
      .goods-item-desc {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: $marginSize;
      }
    }
  }
  .goods-grid {
    margin: $marginSize;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &-item {
      width: 49%;
      border-radius: $radiusSize;
      margin-bottom: $marginSize;
      .goods-item-img {
        width: 100%;
      }
    }
  }
  .goods-waterfall {
    position: relative;
    margin: $marginSize;
    &-item {
      width: 49%;
      border-radius: $radiusSize;
      position: absolute;

      .goods-item-img {
        width: 100%;
      }
    }
  }
</style>
