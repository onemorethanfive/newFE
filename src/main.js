// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import $ from 'jquery'
import axios from 'axios'
// axios.defaults.headers["token"] = ""
import echarts from 'echarts'
import global from './api/global_variables.js'

import { setTimeout } from 'timers';

Vue.component('my-container',{
  template:`
  <el-row>
      <el-col :xs="0" :sm="1" :md="2" :lg="3" :xl="4">&nbsp;</el-col>
      <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="18">
          <slot></slot>
      </el-col>
      <el-col :xs="0" :sm="1" :md="2" :lg="3" :xl="4">&nbsp;</el-col>
  </el-row>
  `
});
Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = axios;
Vue.use(Element, { size: 'small', zIndex: 3000 });
Vue.config.productionTip = false
Vue.prototype.global = global;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: function(){
    return {
      visible:true,
      //urlport:'http://114.155.141.194:8087'
      urlport:'http://127.0.0.1:6060'
    }
  },
  render: h => h(App),
  router,
  components: { App },
  template: '<App/>'
})

axios.interceptors.request.use(
  config => {
      console.log("调用拦截器")
      var token = localStorage["token"];
      if (token) {
          // 这里将token设置到headers中，header的key是Authorization，这个key值根据你的需要进行修改即可
          config.headers.Authorization = token;
      }
      
      // else if(config.headers.){
      // }
      return config
  },
  error => {
      return Promise.reject(error)
  });

  router.beforeEach((to, from, next) => {
    console.log("调用 beforeEach")
    if (to.path === '/login') {
      next();
    } else {
      let token = localStorage.getItem('Authorization');
   
      if (token === 'null' || token === '') {
        next('/login');
      } else {
        next();
      }
    }
  });