import Vue from 'vue'
import Router from 'vue-router'
// 引入组件文件
import Login from '@/components/login.vue'
import Home from '@/components/home.vue'
import User from '@/components/user.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'user',
          path: '/user',
          component: User
        }
      ]
    }, {
      name: 'login',
      path: '/login',
      component: Login
    }

  ]
})
