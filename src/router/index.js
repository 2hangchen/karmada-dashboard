import Index from '../views/index.vue'

const router = [
  {
    path: '/',
    name: 'Index',
    meta: {
      keepAlive: true // 需要被缓存
    },
    component: Index
  },
  {
    path: '/404',
    name: 'Page404',
    component: () =>
      import('../views/error-page/404.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import('../views/login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () =>
      import('../views/register.vue')
  }
]

// const router = new VueRouter({
//   // history: createWebHistory(process.env.BASE_URL),
//   routes,
// });

export default router
