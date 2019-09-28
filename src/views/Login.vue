<template>
  <div class="login-page">
    <navgation-bar :pageName="'登录'" @onLeftClick="onBackClick">
    </navgation-bar>

    <div class="login-page-content">
      <div class="input-container">
        <input v-model="username" type="text" placeholder="用户名">
      </div>

      <div class="input-container">
        <input v-model="password" type="password" placeholder="密码">
      </div>

      <div class="login-page-content-login page-commit" @click="onLoginClick">
        登录
      </div>

      <a class="login-page-content-register" @click="onToRegisterClick">注册新用户</a>
    </div>

  </div>
</template>

<script>
import NavgationBar from '@c/currency/NavigationBar'
import md5 from '../assets/js/md5.min.js'
export default {
  components: {
    NavgationBar
  },
  data: function () {
    return {
      username: '',
      password: '',
      md5Password: ''
    }
  },
  methods: {
    onBackClick: function () {
      this.$router.go(-1)
    },
    onLoginClick: function () {
      if (this.username.length === 0 || this.password.length === 0) {
        alert('用户名或密码未输入')
        return
      }
      this.md5Password = md5(this.password)
      if (window.androidJSBridge) {
        this.onLoginToAndroid()
      } else if (window.webkit) {
        this.onLoginToIos()
      }
    },
    onToRegisterClick: function () {
      this.$router.push({
        name: 'register',
        params: {
          routerType: 'push'
        }
      })
    },
    onLoginToAndroid: function () {
      let userJson = JSON.stringify({
        'username': this.username,
        'password': this.md5Password
      })
      let result = window.androidJSBridge.login(userJson)
      this.onLoginCallback(result)
    },
    onLoginToIos: function () {
      let userObj = {
        'username': this.username,
        'password': this.md5Password
      }
      window.loginCallback = this.onLoginCallback
      window.webkit.messageHandlers.login.postMessage(userObj)
    },
    onLoginCallback: function (result) {
      switch (result) {
        case '-1':
          alert('系统内部错误')
          break
        case '0':
          this.$store.commit('setUsername', this.username)
          this.onBackClick()
          break
        case '1':
          alert('登录用户不存在')
          break
        case '2':
          alert('用户密码错误')
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/css/style.scss';
  .login-page {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: white;
    overflow: hidden;
    &-content {
      width: 100%;
      height: 100%;

      &-username {

      }

      &-password {

      }

      &-login {
        margin-top: 40%;
      }

      &-register {
        font-size: $infoSize;
        color: $textHintColor;
        margin-top: $marginSize;
        display: inline-block;
        padding: $marginSize;
        float: right;
      }
    }
  }
</style>
