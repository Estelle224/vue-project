// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 此处为element UI 提供的引入资源
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
<<<<<<< HEAD
import moment from 'moment'

=======
// 引入moment文件
import moment from 'moment'
>>>>>>> dev-user
// 引入样式文件base.css
import '@/assets/base.css'
// 引入axios文件
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
Vue.prototype.$http = axios

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
