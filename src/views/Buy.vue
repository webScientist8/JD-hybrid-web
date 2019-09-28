<template>
  <div class="buy-page">11111111
    <navigation-bar
      :pageName="'立即购买'"
      @onLeftClick="onBackClick">
    </navigation-bar>
    <div class="buy-page-content">
      <div class="buy-page-content-goods">
        <img class="buy-page-content-goods-img"
             :src="goodsData.img">
        <div class="buy-page-content-goods-desc">
          <p class="buy-page-content-goods-desc-name">
            {{goodsData.name}}
          </p>
          <p class="buy-page-content-goods-desc-price">￥{{goodsData.price | priceValue}}</p>
        </div>
      </div>
      <ul class="buy-page-content-list">
        <li class="buy-page-content-list-item"
            v-for="(item, index) in paymentDatas"
            :key="index"
            @click="onPaymentItemClick(item)">
          <img class="buy-page-content-list-item-icon"
               :src="item.icon"
               alt=""
               srcset="">
          <div class="buy-page-content-list-item-desc">
            <p class="buy-page-content-list-item-desc-name">{{item.name}}</p>
            <p class="buy-page-content-list-item-desc-desc">{{item.desc}}</p>
          </div>
          <img class="buy-page-content-list-item-check"
               :src="getCheckIcon(selectPayment.id === item.id)"
               alt=""
               srcset="">
        </li>
      </ul>
    </div>

    <div class="pay page-commit" @click="onPayClick">
      立即购买
    </div>
  </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar'
export default {
  name: 'Buy',
  components: {
    NavigationBar
  },
  data: function () {
    return {
      goodsData: {},
      paymentDatas: [
        {
          id: '1',
          name: '支付宝支付',
          desc: '数亿用户都在用，安全可托付',
          icon: require('@img/alipay.svg')
        },
        {
          id: '2',
          name: '微信支付',
          desc: '亿万用户选择，更快更安全',
          icon: require('@img/weichat.png')
        }
      ],
      selectPayment: {}
    }
  },
  // 新数据初始化
  created: function () {
    this.selectPayment = this.paymentDatas[0]
    this.loadGoodsData()
  },
  methods: {
    loadGoodsData: function () {
      this.$http.get('/goodsDetail', {
        params: {
          goodsId: this.$route.query.goodsId
        }
      }).then(data => {
        this.goodsData = data.goodsData
      })
    },
    onBackClick: function () {
      this.$router.go(-1)
    },
    onPaymentItemClick: function (item) {
      this.selectPayment = item
    },
    getCheckIcon: function (isCheck) {
      return isCheck ? require('@img/check.svg') : require('@img/no-check.svg')
    },
    onPayClick: function () {
      // 支付宝支付
      if (this.selectPayment.id === '1') {
        this.aliPay()
      } else if (this.selectPayment.id === '2') {
        this.wxPay()
      }
    },
    aliPay: function () {
      if (window.androidJSBridge) {
        window.androidJSBridge.aliPay(JSON.stringify(this.goodsData))
      } else if (window.webkit) {

      }
    },
    wxPay: function () {
      if (window.androidJSBridge) {
        window.androidJSBridge.wxPay(JSON.stringify(this.goodsData))
      } else if (window.webkit) {

      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/css/style.scss';
  .buy-page {
    position: absolute;
    height: 100%;
    width: 100%;
    // 添加 overflow: hidden; 处理在 APP 中页面产生滑动的问题。
    overflow: hidden;

    &-content {
      height: 100%;

      &-goods {
        background-color: white;
        padding: $marginSize;
        display: flex;
        border-bottom: px2rem(1) solid $lineColor;
        border-top: px2rem(1) solid $lineColor;
        margin-top: $marginSize;
        &-img {
          width: px2rem(100);
          height: px2rem(100);
        }

        &-desc {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0 $marginSize;

          &-name {
            font-size: $infoSize;
            line-height: px2rem(18);
          }

          &-price {
            font-size: $titleSize;
            color: $mainColor;
            font-weight: 500;
          }
        }
      }

      &-list {
        margin-top: $marginSize;
        &-item {
          display: flex;
          background-color: white;
          border-bottom: 1px solid $lineColor;
          padding: $marginSize;
          align-items: center;
          &-icon {
            height: px2rem(30);
          }

          &-desc {
            margin-left: px2rem(12);
            flex-grow: 1;
            &-name {
              font-size: $infoSize;
            }

            &-desc {
              font-size: $minInfoSize;
              margin-top: px2rem(6);
              color: $textHintColor;
            }
          }
          &-check {
            width: px2rem(16);
            height: px2rem(16);
          }
        }
      }
    }

    .pay {
      position: absolute;
      bottom: px2rem(52);
    }
  }
</style>
