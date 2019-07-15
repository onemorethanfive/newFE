// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import $ from 'jquery'
import axios from 'axios'
import echarts from 'echarts'
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  components: { App },
  template: '<App/>'
})
