import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'

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
    component: () => import('../views/Detail.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/register',
    name: 'RegisterForm',
    component: () => import('../views/RegisterForm.vue')
  },
  {
    path: '/login',
    name: 'LoginForm',
    component: () => import('../views/LoginForm.vue')
  },
  {
    path: '/password_reset',
    name: 'PasswordReset',
    component: () => import('../views/PasswordReset.vue')
  },
  {
    path: '/password_reset/done',
    name: 'PasswordResetDone',
    component: () => import('../views/PasswordResetDone.vue')
  },
  {
    path: '/api/password_reset/confirm/:token?',
    name: 'PasswordResetConfirm',
    component: () => import('../views/PasswordResetConfirm.vue')
  },
  {
    path: '/pre-checkout',
    name: 'PreCheckout',
    component: () => import('../views/PreCheckout.vue')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../views/Checkout.vue')
  },
  {
    path: '/guest-form',
    name: 'GuestForm',
    component: () => import('../views/GuestForm.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
})

export default router
