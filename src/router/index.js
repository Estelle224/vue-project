import Vue from 'vue'
import Router from 'vue-router'
// 引入组件文件
<<<<<<< HEAD
import login from '@/components/login.vue'
import home from '@/components/home.vue'
import user from '@/components/user.vue'

=======
import Login from '@/components/login.vue'
import Home from '@/components/home.vue'
import User from '@/components/user.vue'
>>>>>>> dev-user
Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
<<<<<<< HEAD
      component: home,
      children: [{
        name: 'user',
        path: '/user',
        component: user
      }]
=======
      component: Home,
      children: [
        {
          name: 'user',
          path: '/user',
          component: User
        }
      ]
>>>>>>> dev-user
    }, {
      name: 'login',
      path: '/login',
      component: Login
    }

  ]
})
