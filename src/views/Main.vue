<template>
  <div class="main">
    <component :is="currentComponent"></component>
    <tool-bar @onChangeFragment="onChangeFragment"></tool-bar>
  </div>
</template>

<script>

import ToolBar from '@c/currency/ToolBar'
export default {
  name: 'Main',
  components: {
    'tool-bar': ToolBar,
    'home': () => import('@c/Home'),
    'shopping': () => import('@c/Shopping'),
    'my': () => import('@c/My')
  },
  data: function () {
    return {
      currentComponent: 'home'
    }
  },
  methods: {
    onChangeFragment: function (componentName) {
      console.log(componentName)
      this.currentComponent = componentName
    }
  }
}
</script>

<style lang="scss" scoped>
  .main {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
