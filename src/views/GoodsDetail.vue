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
          <img src="@img/back-2.svg" alt="">
        </div>
      </template>
    </navgation-bar>

    <div class="goods-detail-content">
<!--      1、设置轮播图高度 SWIPER_IMAGE_HEIGHT 2、添加轮播图数据 在goodsData下面 swiperImgs  3、在MySwiper.vue中传入paginationType 为2 圆点数字-->
      <my-swiper
        :height="SWIPER_IMAGE_HEIGHT + 'px'"
        :swiperImgs="goodsData.swiperImgs"
        :paginationType="'2'"
      >
      </my-swiper>
    </div>
  </div>
</template>

<script>
import NavgationBar from '@c/currency/NavigationBar'
import MySwiper from '@c/swiper/MySwiper'
export default {
  name: 'GoodsDetail',
  components: {
    NavgationBar,
    MySwiper
  },
  data: function () {
    return {
      navBarStyle: {
        // 设置顶部默认颜色
        backgroundColor: ''
      },
      // 设置轮播图高度
      SWIPER_IMAGE_HEIGHT: 364,
      // 商品数据 ---获取数据Goods.vue -- goods: item
      goodsData: {}
    }
  },
  methods: {
    // 点击后跳到前页
    onBackClick: function () {
      this.$router.go(-1)
    }
  },
  // 获取数据Goods.vue -- goods: item
  created: function () {
    this.goodsData = this.$route.params.goods
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
     width: 100%;
  img {
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: px2rem(-13);
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
     overflow: hidden;
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

  &-hint {
     color: $textHintColor;
   }

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
    width: 80%;
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
