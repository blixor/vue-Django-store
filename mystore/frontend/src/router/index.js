import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/detail/:slug',
    name: 'Detail',
    props: true,
    component: () => import('../views/Detail')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart')
  },
  {
    path: '/register',
    name: 'RegisterForm',
    component: () => import('../views/RegisterForm')
  },
  {
    path: '/login',
    name: 'LoginForm',
    component: () => import('../views/LoginForm')
  },
  {
    path: '/password_reset',
    name: 'PasswordReset',
    component: () => import('../views/PasswordReset')
  },
  {
    path: '/password_reset/done',
    name: 'PasswordResetDone',
    component: () => import('../views/PasswordResetDone')
  },
  {
    path: '/api/password_reset/confirm/:token?',
    name: 'PasswordResetConfirm',
    component: () => import('../views/PasswordResetConfirm')
  },
  {
    path: '/pre-checkout',
    name: 'PreCheckout',
    component: () => import('../views/PreCheckout')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../views/Checkout')
  },
  {
    path: '/guest-form',
    name: 'GuestForm',
    component: () => import('../views/GuestForm')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About')
  }
]

const router = new VueRouter({
  routes
})

// Check if user is login before showing login route.
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isLoggedIn
  if (to.name === 'LoginForm' && isAuthenticated) next({ name: 'Home' })
  else next()
  if (to.name === 'RegisterForm' && isAuthenticated) next({ name: 'Home' })
  else next()
  if (to.name === 'Profile' && !isAuthenticated) next({ name: 'Home' })
  else next()
})

export default router
