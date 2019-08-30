<template>
<!--  :navBarStyle="navBarStyle"设置默认颜色-->
  <div class="goods-detail" >
    <navgation-bar
      :isShowBack="false"
      :navBarStyle="navBarStyle">
<!--      设置插槽-->
      <template v-slot:nav-left>
<!--        添加点击事件 跳到前页-->
        <div class="goods-detail-nav-left" @click="onBackClick">
          <img src="@img/back-2.svg" alt=""
               :style="{opacity: leftImgOpacity}">
          <img src="@img/back-white.svg" alt=""
               :style="{opacity: navBarOpactity}">
        </div>
      </template>
      <template v-slot:nav-center>
        <p class="goods-detail-nav-title"
           :style="{opacity: navBarOpactity}"
           style="font-size: 23px"
           >商品详情</p>
      </template>
    </navgation-bar>

    <div class="goods-detail-content">
      <parallax @onScrollChange="onScrollChange">
      <template v-slot:parallax-slow>
<!--      1、设置轮播图高度 SWIPER_IMAGE_HEIGHT 2、添加轮播图数据 在goodsData下面 swiperImgs  3、在MySwiper.vue中传入paginationType 为2 圆点数字-->
      <my-swiper
        :height="SWIPER_IMAGE_HEIGHT + 'px'"
        :swiperImgs="goodsData.swiperImgs"
        :paginationType="'2'"
      >
        </my-swiper>
      </template>

      <template>
        <div class="goods-detail-content-desc">
          <div class="goods-detail-content-desc-item">
            <p class="goods-detail-content-desc-item-price">￥{{goodsData.price | priceValue}}</p>
            <p class="goods-detail-content-desc-item-name">
              <direct v-if="goodsData.isDirect"></direct>
              {{goodsData.name}}
            </p>
          </div>

          <div class="goods-detail-content-desc-item">
            <p class="goods-detail-content-desc-item-select">已选
              <span class="single-row-text">{{goodsData.name}}</span>
            </p>
            <div class="goods-detail-content-desc-item-support">
              <ul class="goods-detail-content-desc-item-support-list">
                <li class="goods-detail-content-desc-item-support-list-item"
                    v-for="(item, index) in supportDatas"
                    :key="index">
                  <img src="@img/support.svg" alt="" srcset="">
                  <span>{{item}}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="goods-detail-content-desc-detail">
            <img v-for="(item, index) in goodsData.detailImgs" :key="index" :src="item" alt="" srcset="">
          </div>
        </div>
      </template>
      </parallax>
    </div>
    <div class="goods-detail-buy">
      <div class="goods-detail-buy-add">
        加入购物车
      </div>
      <div class="goods-detail-buy-now" >
        立即购买
      </div>
    </div>
  </div>
</template>

<script>
import NavgationBar from '@c/currency/NavigationBar'
import MySwiper from '@c/swiper/MySwiper'
import direct from '@c/goods/Direct'
import Parallax from '@c/parallax/Parallax'
// import Parallax from '@c/parallax/Parallax'
export default {
  name: 'GoodsDetail',
  components: {
    NavgationBar,
    MySwiper,
    direct,
    Parallax
  },
  data: function () {
    return {
      // 商品数据 ---获取数据Goods.vue -- goods: item
      goodsData: {},
      // 设置轮播图高度
      SWIPER_IMAGE_HEIGHT: 364,
      ANCHOR_SCROLL_TOP: 310,
      scrollValue: 0,
      supportDatas: [
        '可配送海外', '京东发货&售后', '京准达', '211限时达', '可自提', '不可使用优惠券'
      ]
    }
  },
  methods: {
    // 点击后跳到前页
    onBackClick: function () {
      this.$router.go(-1)
    },
    onScrollChange: function (scrollValue) {
      this.scrollValue = scrollValue
    }
  },
  // 获取数据Goods.vue -- goods: item
  created: function () {
    this.goodsData = this.$route.params.goods
  },
  computed: {
    leftImgOpacity: function () {
      return 1 - this.scrollValue / this.ANCHOR_SCROLL_TOP
    },
    navBarOpactity: function () {
      return 1 - this.leftImgOpacity
    },
    navBarStyle: function () {
      return {
        backgroundColor: 'rgba(216, 30, 6, ' + this.navBarOpactity + ')',
        position: 'fixed',
        top: 0
      }
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/css/style.scss';
  .goods-detail {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;

  &-nav-left {
     position: relative;
     display: flex;
     width: 100%;
  img {
    position: absolute;
    align-self: center;
  }
  }
    &-nav-title {
      width: 100%;
      height: 100%;
      font-size: $titleSize;
      font-weight: bold;
      text-align: center;
      color: white;
    }
  &-content {
     height: 100%;

  &-desc {
     width: 100%;
     background-color: $bgColor;
     box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.2);
  &-item {
     background-color: white;
     padding: $marginSize;
     margin-bottom: $marginSize;

  &-price {
     font-size: px2rem(20);
     color: $mainColor;
     font-weight: 500;
   }

  &-name {
     margin-top: $marginSize;
     font-size: $titleSize;
     font-weight: 500;
     line-height: px2rem(20);
  }

  &-select {
     font-size: $infoSize;
     color: $textHintColor;
     height: px2rem(44);
     display: flex;
     align-items: center;
     border-bottom: px2rem(1) solid $lineColor;

  span {
    color: $textColor;
    font-size: $titleSize;
    font-weight: bolder;
    margin-left: px2rem(4);
  }
  }

  &-support {
     margin-top: $marginSize;

  &-list {
     display: flex;
     flex-wrap: wrap;

  &-item {
     display: flex;
     align-items: center;
     padding: px2rem(6) 0;
     margin-right: $marginSize;

  img {
    width: px2rem(12);
    margin-right: px2rem(4);
  }

  span {
    font-size: $minInfoSize;
    color: $textHintColor;
  }
  }
  }
  }
  }

  &-detail {
  img {
    width: 100%;
  }
  }
  }

  }

  &-buy {
     background-color: white;
     border-top: px2rem(1) solid $lineColor;
     height: px2rem(46);
     line-height: px2rem(46);
     text-align: right;

  div {
    display: inline-block;
    width: px2rem(100);
    text-align: center;
    font-size: $infoSize;
    color: white;
  }

  &-add {
     background-color: $mainColor;
   }

  &-now {
     background-color: darkgoldenrod;
   }
  }
  }
</style>
