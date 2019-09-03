<template>
  <div class="my">
    <navigation-bar :pageName="'个人中心'" :isShowBack="false"></navigation-bar>

    <div class="my-content">

      <div class="my-content-desc" @click="onLoginClick">
        <img class="my-content-desc-avater"
             src="@img/avater.png"
             alt=""
             srcset="">
        <p class="my-content-desc-login">
          {{$store.state.username ? $store.state.username : '登录/注册'}}
        </p>
      </div>

      <div class="my-content-tools">
        <div class="my-content-tools-item"
             v-for="(item, index) in toolsDatas"
             :key="index">
          <p class="my-content-tools-item-name">
            {{item}}
          </p>
          <img class="my-content-tools-item-arrow"
               src="@img/right-arrow.svg"
               alt=""
               srcset="">
        </div>
      </div>

      <div class="my-content-logout page-commit"
           v-if="$store.state.username"
           @click="onLogoutClick">
        退出登录
      </div>

    </div>
  </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar'
export default {
  name: 'my',
  components: {
    NavigationBar
  },
  data: function () {
    return {
      toolsDatas: [
        '全部订单',
        '我的预约',
        '应用推荐',
        '用户福利'
      ]
    }
  },
  methods: {
    onLoginClick: function () {
      this.$router.push({
        name: 'login',
        params: {
          routerType: 'push'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/css/style.scss';
  .my {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;

    &-content {
      height: 100%;
      width: 100%;

      &-desc {
        margin-top: $marginSize;
        background-color: white;
        height: px2rem(68);
        display: flex;
        align-items: center;
        border-top: 1px solid $lineColor;
        border-bottom: 1px solid $lineColor;
        padding: $marginSize;

        &-avater {
          width: px2rem(52);
          height: px2rem(52);
        }

        &-login {
          margin-left: $marginSize;
          font-size: $titleSize;
        }
      }

      &-tools {
        &-item {
          display: flex;
          height: px2rem(46);
          box-sizing: border-box;
          align-items: center;
          padding: $marginSize;
          background-color: white;
          border-bottom: 1px solid $lineColor;

          &-name {
            font-size: $infoSize;
            flex-grow: 1;
          }

          &-arrow {
            width: px2rem(16);
          }
        }
      }

      &-logout {
        margin-top: 20%;
      }
    }
  }
</style>
