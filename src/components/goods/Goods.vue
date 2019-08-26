<template>
    <div class="goods goods-waterfall" :style="{height: goodsViewHeight}">
      <div class="goods-item goods-waterfall-item" ref="goodsItem" v-for="(item, index) in dataSource" :key="index" :style="goodsItemStyles[index]">
        <img class="goods-item-img" :src="item.img" alt="" :style="imgStyles[index]">
        <div class="goods-item-desc">
          <p class="goods-item-desc-name">
            <span class="text-line-2">{{item.name}}</span>
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
export default {
  name: 'Goods',
  data: function () {
    return {
      dataSource: [],
      MIN_IMG_HEIGHT: 178,
      MAX_IMG_HEIGHT: 230,
      imgStyles: [],
      ITEM_MARGIN_SIZE: 8,
      goodsItemStyles: [],
      goodsViewHeight: 0
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
          this.initImgStyles()
          this.$nextTick(() => {
            this.initWaterfall()
          })
        })
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
      this.goodsViewHeight = (leftHeightTotal > rightHeightTotal ? leftHeightTotal : rightHeightTotal) + 'px'
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
