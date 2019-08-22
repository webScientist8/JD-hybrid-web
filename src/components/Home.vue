<template>
    <div class="home">
      <div class="home-content">
        <my-swiper :swiperImgs="swiperData.map(item => item.icon)" :height="swiperHeight"></my-swiper>
      </div>
    </div>
</template>

<script>
import MySwiper from '@c/swiper/MySwiper'
export default {
  name: 'home',
  components: {
    MySwiper
  },
  data: function () {
    return {
      swiperData: [],
      swiperHeight: '184px'
    }
  },
  created: function () {
    this.initData()
  },
  methods: {
    initData: function () {
      this.$http.get('/swiper')
        .then(data => {
          this.swiperData = data.list
        }).catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .home{
    width: 100%;
    height: 100%;
    &-content {
      height: 100%;
    }
  }
</style>
