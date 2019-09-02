<template>
  <div class="main">
    <keep-alive>
    <component :is="currentComponent"></component>
    </keep-alive>
    <tool-bar ref="toolBar" @onChangeFragment="onChangeFragment"></tool-bar>
  </div>
</template>

<script>

import ToolBar from '@c/currency/ToolBar'
export default {
  name: 'imooc',
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
  activated: function () {
    this.pushFragment()
  },
  methods: {
    onChangeFragment: function (componentName) {
      this.currentComponent = componentName
    },
    pushFragment: function () {
      let componentIndex = this.$route.params.componentIndex
      if (componentIndex === undefined) return
      this.$refs.toolBar.pushFragment(componentIndex)
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
