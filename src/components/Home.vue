<template>
    <div class="home">
      <div class="home-content">
        <my-swiper :swiperImgs="swiperData.map(item => item.icon)" :height="swiperHeight"></my-swiper>
        <activity>
          <div class="activity-520">
            <img v-for="(item, index) in activityDatas" :key="index" :src="item.icon" alt="">
          </div>
        </activity>
        <mode-options></mode-options>
        <seconds :dataSource="secondsDatas"></seconds>
        <activity>
          <div class="activity-ping-gou-jie">
            <img src="../assets/img/pinGouJie.jpg" alt="">
          </div>
        </activity>
        <goods></goods>
      </div>
    </div>
</template>

<script>
import MySwiper from '@c/swiper/MySwiper'
import Activity from '@c/currency/Activity'
import ModeOptions from '@c/currency/ModeOptions'
import Seconds from '@c/seconds/Seconds'
import Goods from '@c/goods/Goods'
export default {
  name: 'home',
  components: {
    MySwiper,
    Activity,
    ModeOptions,
    Seconds,
    Goods
  },
  data: function () {
    return {
      swiperData: [],
      swiperHeight: '184px',
      activityDatas: [],
      secondsDatas: []
    }
  },
  created: function () {
    this.initData()
  },
  methods: {
    initData: function () {
      this.$http.all([
        this.$http.get('/swiper'),
        this.$http.get('/activitys'),
        this.$http.get('/seconds')
      ]).then(this.$http.spread((swiperData, activityDatas, secondsDatas) => {
        this.swiperData = swiperData.list
        this.activityDatas = activityDatas.list
        this.secondsDatas = secondsDatas.list
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/css/style';
  .home {
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    &-content {
      height: 100%;
      .activity-520 {
        background-color: #F5F5F5;
        margin-top: px2rem(-8);
        border-top-left-radius: px2rem(8);
        border-top-right-radius: px2rem(8);
        img {
          display: inline-block;
          width: 33.33%;
        }
      }
      .activity-ping-gou-jie{
        background-color: white;
        margin-top: $marginSize;
        img{
          width: 100%;
        }
      }
    }
  }
</style>
