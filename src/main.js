// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 此处为element UI 提供的引入资源
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入moment文件
import moment from 'moment'
// 引入样式文件base.css
import myBread from '@/components/myBread.vue'

import '@/assets/base.css'
// 引入axios文件

import http from './plugins/http'
// 引入自定义面包屑组件
Vue.use(http)
// 要想在全局使用面包屑组件---声明全局面包屑组件
Vue.component('my-bread', myBread)
// 全局过滤器---处理日期格式
Vue.filter('formdata', (v) => {
  return moment(v).format('YYYY-MM-DD')
})
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
