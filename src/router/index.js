import Vue from 'vue'
import Router from 'vue-router'

const MainPage = () => import('../views/main_page')
const testPage = () => import('../views/test_page')
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
    }, {
      name: 'testPage',
      path: '/test',
      component: testPage,
      beforeEnter(to, from, next) {
        console.log(to + from + 'before inner enter')
        next()
      },
      beforeLeave(to, from) {
        console.log(to + from + 'before inner leave')
      }
    }
  ]
})
 router.beforeEach((to, from, next) => {
   console.log(to + from + 'before glob')
   next()
 })
 router.afterEach((to, from) => {
   console.log(to + from + 'after glob')
 })
export default router