import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shoppingDatas: [],
    isIphoneX: false,
    username: undefined
  },
  mutations: {
    addShoppingData: function (state, goods) {
      const isExist = state.shoppingDatas.some(item => {
        if (item.id === goods.id) {
          item.number += 1
          return true
        }
      })
      if (!isExist) {
        Vue.set(goods, 'isCheck', false)
        Vue.set(goods, 'number', 1)
        state.shoppingDatas.push(goods)
      }
    },
    changeShoppingDataNumber: function (state, data) {
      state.shoppingDatas[data.index].number = data.number
    },
    setIsIphoneX: function (state, isIphoneX) {
      state.isIphoneX = isIphoneX
    },
    setUsername: function (state, username) {
      state.username = username
    },
    clearUsername: function (state) {
      state.username = undefined
    }
  },
  actions: {

  }
})
