<template>
  <swiper :options="swiperOptions">
    <swiper-slide v-for="(item, index) in swiperImgs" :key="index">
      <img class="swiper-slide-img" :style="{height: height}" :src="item" alt="">
    </swiper-slide>

    <template v-slot:pagination>
      <div class="swiper-pagination swiper-pagination-fraction">
      </div>
    </template>
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'MySwiper',
  props: {
    height: {
      type: String,
      default: 'auto'
    },
    swiperImgs: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    },
    // 圆点数字切换
    paginationType: {
      type: String,
      default: '1'
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  data: function () {
    return {
      swiperOptions: {
        autoplay: true,
        autoHeight: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          bulletClass: 'custom-bulle-class'
        }
      }
    }
  },
  created: function () {
    this.initPaginnationLayout()
  },
  methods: {
    /**
     * 根据分页器类型配置对应的分页器--圆点数字切换
     */
    initPaginnationLayout: function () {
      switch (this.paginationType) {
        // case '1':为1是圆点分页器
        case '1':
          // 为1 还是默认首页轮播图圆点分页器类型
          this.swiperOptions.pagination = {
            // 分页器对应html元素
            el: '.swiper-pagination',
            // 圆点分页器样式
            type: 'bullets',
            // 分页器内的元素,添加类名
            bulletClass: 'custom-bullet-class'
          }
          break
        // 为2是数字分页器 改变首页轮播图圆点分页器类型
        case '2':
          this.swiperOptions.pagination = {
            el: '.swiper-pagination',
            // 数字分页器样式
            type: 'fraction'
          }
          break
      }
    }
  }
}
</script>

<style lang="scss">
  @import '../../assets/css/style.scss';

  .swiper-container {
    .swiper-wrapper {
      .swiper-slide {
        background-color: white;
        .swiper-slide-img {
          width: 100%;
        }
      }
    }

    .swiper-pagination {
      bottom: px2rem(12);
      .custom-bullet-class {
        box-sizing: border-box;
        border-radius: 100%;
        height: px2rem(6);
        width: px2rem(6);
        border: px2rem(1) solid #fff;
        margin: 0 px2rem(4);
        display: inline-block;
        opacity: 1;
      }

      .swiper-pagination-bullet-active {
        background: white;
      }

    }

    .swiper-pagination-fraction {
      left: auto;
      right: 0;
      width: auto;
      font-size: $infoSize;
      background-color: rgba(0, 0, 0, .3);
      padding: px2rem(6) px2rem(18);
      border-top-left-radius: px2rem(16);
      border-bottom-left-radius: px2rem(16);
      bottom: px2rem(32);
      color: white;

      .swiper-pagination-current {
        font-size: $titleSize;
        font-weight: bold;
      }
    }
  }

</style>
