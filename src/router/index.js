import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { onlyAuthUser: true },
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: () =>
      import(/* webpackChunkName: "schedule" */ '../views/Schedule.vue'),
    props: () => ({
      name: 'Schedule',
    }),
    meta: { onlyAuthUser: true },
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () =>
      import(/* webpackChunkName: "schedule" */ '../views/Schedule.vue'),
    props: () => ({
      name: 'Setting',
    }),
    meta: { onlyAuthUser: true },
  },
  {
    path: '/planner',
    name: 'Planner',
    component: () =>
      import(/* webpackChunkName: "planner" */ '../views/Schedule.vue'),
    props: () => ({
      name: 'Planner',
    }),
    meta: { onlyAuthUser: true },
  },
  {
    path: '/about',
    name: 'About',
    /** NOTE
     * write webpackChunkName in every import
     * it makes debuging easier
     * */
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/createwallet',
    name: 'CreateWallet',
    component: () =>
      import(/* webpackChunkName: "addRecord" */ '../views/CreateWallet.vue'),
    meta: { onlyAuthUser: true },
  },
  {
    path: '/addrecord',
    name: 'AddRecord',
    component: () =>
      import(/* webpackChunkName: "addRecord" */ '../views/Record.vue'),
    meta: { onlyAuthUser: true },
  },
  {
    path: '/history',
    name: 'History',
    component: () =>
      import(/* webpackChunkName: "addRecord" */ '../views/History.vue'),
    meta: { onlyAuthUser: true },
  },
  {
    path: '/updatewallet',
    name: 'UpdateWallet',
    component: () =>
      import(/* webpackChunkName: "addRecord" */ '../views/UpdateWallet.vue'),
    props: route => ({
      ...route.params,
    }),
    meta: { onlyAuthUser: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: { onlyGuestUser: true },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () =>
      import(/* webpackChunkName: "signup" */ '../views/Signup.vue'),
    meta: { onlyGuestUser: true },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  store.dispatch('auth/getAuthUser').then(() => {
    if (to.meta.onlyAuthUser) {
      if (store.getters['auth/isAuthenticated']) {
        next()
      } else {
        next({ name: 'Login' })
      }
    } else if (to.meta.onlyGuestUser) {
      if (store.getters['auth/isAuthenticated']) {
        next({ name: 'Home' })
      } else {
        next()
      }
    } else {
      next()
    }
  })
})

export default router
