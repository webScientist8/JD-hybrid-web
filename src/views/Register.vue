<template>
  <div class="register-page">
    <navgation-bar :pageName="'注册'" @onLeftClick="onBackClick">
    </navgation-bar>

    <div class="register-page-content">
      <div class="input-container">
        <input v-model="username" type="text" placeholder="用户名">
      </div>

      <div class="input-container">
        <input v-model="password" type="password" placeholder="密码">
      </div>

      <div class="input-container">
        <input v-model="comfirmPassword" type="password" placeholder="确认密码">
      </div>

      <div class="register-page-content-login page-commit" @click="onRegisterClick">
        注册
      </div>

    </div>

  </div>
</template>

<script>
import NavgationBar from '@c/currency/NavigationBar'
export default {
  name: 'Register',
  components: {
    NavgationBar
  },
  data: function () {
    return {
      username: '',
      password: '',
      comfirmPassword: '',
      md5Password: ''
    }
  },
  methods: {
    onBackClick: function () {
      this.$router.go(-1)
    },
    onRegisterClick: function () {
      if (this.username.length === 0) {
        alert('请完善用户名')
        return
      }
      if (this.password.length === 0 || this.password != this.comfirmPassword) {
        alert('请完善密码')
        return
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/css/style.scss';
  .register-page {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: white;
    &-content {
      width: 100%;
      height: 100%;
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
