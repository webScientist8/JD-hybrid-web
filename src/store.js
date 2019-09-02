import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shoppingDatas: []
  },
  mutations: {
    addShoppingData: function (state) {
      state.shoppingDatas.push(goods)
    }

  },
  actions: {

  }
})
