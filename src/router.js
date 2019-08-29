import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/goodsList',
      name: 'goodsList',
      component: () => import(/* webpackChunkName: "goodsList" */ './views/GoodsList.vue')
    },
    // 注册商品详情页
    {
      path: '/goodsDetail',
      name: 'goodsDetail',
      component: () => import('./views/GoodsDetail.vue')
    }
  ]
})
