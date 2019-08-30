<template>
  <div class="parallax" @scroll="onScrollChange">
    <!-- 缓慢移动内容 -->
    <div class="parallax-slow" :style="{top: slowTop}">
      <slot name="parallax-slow"></slot>
    </div>
    <!-- 正常移动内容 -->
    <div class="parallax-content z-index-2">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Parallax',
  data: function () {
    return {
      SPEED_DIFF: 2,
      parallaxScroll: 0
    }
  },
  methods: {
    onScrollChange: function ($event) {
      this.parallaxScroll = $event.target.scrollTop
      this.$emit('onScrollChange', this.parallaxScroll)
    }
  },
  computed: {
    slowTop: function () {
      return (this.parallaxScroll - (this.parallaxScroll / this.SPEED_DIFF)) + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
  .parallax {
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    &-slow {
      width: 100%;
      position: relative;
    }

    &-content {
      height: 100%;
      position: relative;
    }
  }
</style>
