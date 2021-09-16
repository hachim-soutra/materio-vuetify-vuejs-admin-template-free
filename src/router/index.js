import Vue from 'vue'
import Router from 'vue-router'

// eslint-disable-next-line import/extensions
import config from '../config.js'

// eslint-disable-next-line import/extensions
import store from '../store/index.js'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: 'dashboard',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
  },
  {
    path: '/typography',
    name: 'typography',
    component: () => import('@/views/typography/Typography.vue'),
  },
  {
    path: '/icons',
    name: 'icons',
    component: () => import('@/views/icons/Icons.vue'),
  },
  {
    path: '/cards',
    name: 'cards',
    component: () => import('@/views/cards/Card.vue'),
  },
  {
    path: '/simple-table',
    name: 'simple-table',
    component: () => import('@/views/simple-table/SimpleTable.vue'),
  },
  {
    path: '/command',
    name: 'command',
    component: () => import('@/views/Order/index.vue'),
  },
  {
    path: '/form-layouts',
    name: 'form-layouts',
    component: () => import('@/views/form-layouts/FormLayouts.vue'),
  },
  {
    path: '/pages/account-settings',
    name: 'pages-account-settings',
    component: () => import('@/views/pages/account-settings/AccountSettings.vue'),
  },
  {
    path: '/pages/login',
    name: 'pages-login',
    component: () => import('@/views/pages/Login.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/pages/register',
    name: 'pages-register',
    component: () => import('@/views/pages/Register.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]

// eslint-disable-next-line no-undef
const router = new Router({
  mode: 'history',
  base: config.base_name,
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  },
  routes,
})

router.beforeResolve((to, from, next) => {
  store.dispatch('check_auth')
  next()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // store.dispatch('check_auth');
    // next();
    // return;
    if (store.getters.isLoggedIn) {
      store.dispatch('check_auth')
      next()

      return
    }
    store.dispatch('logout')
    router.push({ name: 'Login' })
  } else {
    next()
  }
})

export default router
