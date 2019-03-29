import Vue from 'vue'
import Router from 'vue-router'

const MainPage = () => import('../views/main_page')
Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      name: 'mainPage',
      path: '/',
      component: MainPage,
      meta: {
        name: '首页'
      }
    }
  ]
})

export default router