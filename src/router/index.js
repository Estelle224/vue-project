import Vue from 'vue'
import Router from 'vue-router'
// 引入组件文件
import Login from '@/components/login.vue'
import Home from '@/components/home.vue'
import User from '@/components/user.vue'
import rights from '@/components/rights.vue'
import roles from '@/components/roles.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'users',
          path: '/users',
          component: User
        },
        {
          name: 'rights',
          path: '/rights',
          component: rights
        },
        {
          name: 'roles',
          path: '/roles',
          component: roles
        }
      ]

    }, {
      name: 'login',
      path: '/login',
      component: Login
    }

  ]
})

router.beforeEach((to, from, next) => {
  console.log(to, from)
  if (to.name === 'login') {
    next()
  } else {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push({
        name: 'login'
      })
    } else {
      next()
    }
  }
})
export default router
