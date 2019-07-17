import Vue from 'vue'
import Router from 'vue-router'
import Header from '@/components/Header.vue'
import Home from '@/components/HOME.vue'
import Login from '@/components/Login.vue'
import Signup from '@/components/Signup.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: '首页',
        requiresAuth: true // 是否需要判断是否登录
      }
    },
    { path: '/login',name:'Login', component:Login},
    { path: '/signup',name:'Signup', component:Signup},
  ]
})


