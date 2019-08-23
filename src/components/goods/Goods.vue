<template>
    <div class="goods goods-waterfall">
      <div class="goods-item goods-waterfall-item" v-for="(item, index) in dataSource" :key="index">
        <img class="goods-item-img" :src="item.img" alt="">
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
      dataSource: []
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
        })
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
