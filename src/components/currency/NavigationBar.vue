<template>
    <div class="nav-bar z-index-max"
         :style="navBarStyle"
         :class="{'bottom-line': pageName}"
    ><div class="left" @click="$emit('onLeftClick')">
        <img v-if="isShowBack" src="@img/back.svg" alt="">
        <slot name="nav-left"></slot>
      </div>
      <div class="center">
        <span class="page-title" v-if="pageName">{{pageName}}</span>
        <slot name="nav-center"></slot>
      </div>
      <div class="right">
        <slot name="nav-right"></slot>
      </div>
    </div>
</template>

<script>
export default {
  name: 'NavigationBar',
  props: {
    isDefault: {
      default: true,
      type: Boolean
    },
    isShowBack: {
      default: true,
      type: Boolean
    },
    pageName: {
      default: '',
      type: String
    },
    navBarStyle: {
      type: Object,
      default: function () {
        return {
          backgroundColor: 'white'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/css/style.scss';
  .nav-bar {
    width: 100%;
    height: $navBarHeight;
    line-height: $navBarHeight;
    display: flex;
    justify-content: space-between;
    padding-top: $stateBarHeight;

    .left, .right {
      display: flex;
      height: 100%;
      width: px2rem(26);
      padding: 0 8px;
      img {
        width: 100%;
        align-self: center;
      }
    }

    .center {
      display: flex;
      height: 100%;
      flex-grow: 1;
      .page-title {
        align-self: center;
        margin: 0 auto;
        font-size: $titleSize;
      }
    }
  }

  .bottom-line{
    border-bottom: 1px solid $lineColor;
  }
</style>
