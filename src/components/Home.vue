<template>
    <div class="home" @scroll="onScrollChange" ref="home">
      <navgation-bar :isShowBack="false" :navBarStyle="navBarStyle">
        <template v-slot:nav-left>
          <img :src="navBarCurrentSlotStyle.leftIcon">
        </template>
        <template v-slot:nav-center>
          <search
            :bgColor="navBarCurrentSlotStyle.search.bgColor"
            :hintColor="navBarCurrentSlotStyle.search.hintColor"
            :icon="navBarCurrentSlotStyle.search.icon">
          </search>
        </template>
        <template v-slot:nav-right>
          <img :src="navBarCurrentSlotStyle.rightIcon">
        </template>
      </navgation-bar>
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
        <goods :layoutType="'3'" :isScroll="false"></goods>
      </div>
    </div>
</template>

<script>
import MySwiper from '@c/swiper/MySwiper'
import Activity from '@c/currency/Activity'
import ModeOptions from '@c/currency/ModeOptions'
import Seconds from '@c/seconds/Seconds'
import Goods from '@c/goods/Goods'
import NavgationBar from '@c/currency/NavigationBar'
import Search from '@c/currency/Search'
export default {
  name: 'home',
  components: {
    NavgationBar,
    MySwiper,
    Activity,
    ModeOptions,
    Seconds,
    Goods,
    Search
  },
  data: function () {
    return {
      swiperData: [],
      swiperHeight: '184px',
      activityDatas: [],
      secondsDatas: [],
      navBarSlotStyle: {
        normal: {
          leftIcon: require('@img/more-white.svg'),
          search: {
            bgColor: '#fff',
            hintColor: '#999',
            icon: require('@img/search.svg')
          },
          rightIcon: require('@img/message-white.svg')
        },
        highlight: {
          leftIcon: require('@img/more.svg'),
          search: {
            bgColor: '#d7d7d7',
            hintColor: '#fff',
            icon: require('@img/search-white.svg')
          },
          rightIcon: require('@img/message.svg')
        }
      },
      navBarCurrentSlotStyle: {},
      navBarStyle: {
        position: 'fixed',
        backgroundColor: ''
      },
      scrollTopValue: -1,
      ANCHOR_SCROLL_TOP: 160
    }
  },
  created: function () {
    this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal
    this.initData()
  },
  activated: function () {
    this.$refs.home.scrollTop = this.scrollTopValue
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
    },
    onScrollChange: function ($event) {
      this.scrollTopValue = $event.target.scrollTop

      let opacity = this.scrollTopValue / this.ANCHOR_SCROLL_TOP
      if (opacity >= 1) {
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.highlight
      } else {
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal
      }
      this.navBarStyle.backgroundColor = 'rgba(255, 255, 255, ' + opacity + ')'
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
