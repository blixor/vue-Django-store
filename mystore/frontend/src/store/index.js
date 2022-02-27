import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'
import VuexPersistence from 'vuex-persist'

axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackbar: {
      show: false,
      color: '',
      text: ''
    },
    status: '',
    token: '',
    user: {},
    products: [],
    stars: [],
    cart: []
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    AUTH_REQUEST (state) {
      state.status = 'loading'
    },
    AUTH_ERROR (state) {
      state.status = 'Please try again!'
    },
    AUTH_SUCCESS (state, payload) {
      state.status = 'success'
      state.token = payload.token
      state.user = payload.user
    },
    PROFILE_UPDATE (state, payload) {
      const user = state.user
      user.address = payload.profile.address
      user.city = payload.profile.city
      user.state = payload.profile.state
      user.zipcode = payload.profile.zipcode
      user.phone = payload.profile.phone
    },
    LOGOUT (state) {
      state.status = ''
      state.token = ''
      state.user = {}
    },
    CHECKOUT_SUCCESS (state) {
      state.stars = []
      state.cart = []
    },
    starRating (state, payload) {
      const { itemId, value } = payload
      const i = state.stars.findIndex((item) => {
        return item.itemId === itemId
      })
      if (i === -1) {
        state.stars.push({ itemId, value })
      } else {
        state.stars[i].value = value
      }
    },
    addCart (state, payload) {
      const { itemId, qty, image, name, price } = payload
      // Validation
      const checkProduct = state.products.find((product) => {
        return product.id === itemId && product.price === price
      })
      if (!checkProduct) {
        return
      }
      // Find product index and push items or increase qty.
      const indx = state.cart.findIndex((item) => {
        return item.itemId === itemId
      })
      if (indx === -1) {
        state.cart.push({ name, itemId, qty, image, price })
      } else {
        state.cart[indx].qty += qty
      }
    },
    cartSnack (state, payload) {
      state.snackbar = payload
      state.snackbar.color = payload.color
      state.snackbar.text = payload.text
    },
    guestUser (state, payload) {
      state.user = payload
    },
    remove (state, itemId) {
      // Find product index and delete from cart.
      const index = state.cart.findIndex((item) => {
        return item.itemId === itemId
      })
      state.cart.splice(index, 1)
    }
  },
  plugins: [new VuexPersistence().plugin],
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    cartLen: (state) => {
      const res = state.cart.map(item => {
        return item.qty
      })
      return res.reduce((total, num) => total + num, 0)
    },
    subTotal: (state) => {
      let res = 0
      state.cart.map(item => {
        res += item.price * item.qty
      })
      return parseFloat(res).toFixed(2)
    },
    tax: (getters) => {
      return (parseFloat(getters.subTotal) * 0.115).toFixed(2)
    },
    grandTotal: (getters) => {
      return parseFloat(getters.subTotal) + parseFloat(getters.tax)
    }
  },
  actions: {
    async getProducts ({ commit }) {
      await axios.get('http://127.0.0.1:8000/products/')
        .then((res) => {
          commit('SET_PRODUCTS', res.data)
        }).catch((_err) => {
          commit('cartSnack', {
            show: true,
            color: 'red darken-3',
            text: 'Server Error'
          })
        })
    },
    async register ({ commit }, user) {
      commit('AUTH_REQUEST')
      const res = await axios.post('http://127.0.0.1:8000/users/register/', user)
      if (res.status === 201) {
        router.push('/login')
      } else {
        commit('AUTH_ERROR')
        commit('cartSnack', {
          show: true,
          color: 'red darken-3',
          text: res.data.username ? res.data.username[0] : 'An error has ocurred'
        })
        delete axios.defaults.headers.common['Authorization']
      }
    },
    async login ({ commit }, user) {
      commit('AUTH_REQUEST')
      axios.defaults.headers.common['X-CSRFToken'] = user.csrftoken
      await axios.post('http://127.0.0.1:8000/users/login/', user)
        .then((res) => {
          if (res.status === 200) {
            const authToken = res.data.token
            const user = res.data
            axios.defaults.headers.common['Authorization'] = authToken
            commit('AUTH_SUCCESS', {
              token: authToken,
              user: user
            })
          }
        })
        .catch((_err) => {
          commit('AUTH_ERROR')
          delete axios.defaults.headers.common['Authorization']
        })
    },
    // user update
    async update ({ commit, state }, profile) {
      const id = state.user.user_id
      const token = state.token
      await axios.patch(`http://127.0.0.1:8000/users/update/${id}/`, profile, {
        headers: {
          Authorization: `Token ${token}`
        }
      })
        .then((res) => {
          const profile = res.data
          commit('PROFILE_UPDATE', {
            profile: profile
          })
          commit('cartSnack', {
            show: true,
            color: 'success',
            text: 'Update Profile Success!'
          })
        })
    },
    async checkout ({ commit, state, getters }) {
      const res = await axios.post('http://127.0.0.1:8000/orders/order/', {
        order: {
          cart: state.cart,
          rating: state.stars,
          subtotal: getters.subTotal,
          tax: getters.tax,
          total: getters.grandTotal,
          first_name: state.user.first_name,
          last_name: state.user.last_name,
          email: state.user.email,
          phone: state.user.phone,
          address: state.user.address,
          city: state.user.city,
          state: state.user.state,
          zipcode: state.user.zipcode
        }
      })
      if (res.status === 200) {
        commit('CHECKOUT_SUCCESS')
        // TODO: push thankyou page
      }
    },
    // deactivate user
    async delete ({ commit, state }, user) {
      const id = state.user.user_id
      const token = state.token
      await axios.post(`http://127.0.0.1:8000/users/delete/${id}/`, user, {
        headers: {
          Authorization: `Token ${token}`
        }
      })
        .then((res) => {
          // delete all the states
          if (res.status === 204) {
            commit('LOGOUT')
            delete axios.defaults.headers.common['Authorization']
            router.push('/')
          }
        })
        .catch((_err) => {
          commit('cartSnack', {
            show: true,
            color: 'red darken-3',
            text: 'An error has ocurred, check your password'
          })
        })
    },
    async changePassword ({ commit, state }, passwords) {
      const id = state.user.user_id
      const token = state.token
      await axios.put(`http://127.0.0.1:8000/users/delete/${id}/`, passwords, {
        headers: {
          Authorization: `Token ${token}`
        }
      })
        .then((_res) => {
          commit('LOGOUT')
          delete axios.defaults.headers.common['Authorization']
          router.push('/login')
          commit('cartSnack', {
            show: true,
            color: 'success',
            text: 'Password Change Success!'
          })
        })
    },
    async passwordReset ({ commit }, email) {
      await axios.post('http://127.0.0.1:8000/api/password_reset/', {
        email: email
      })
        .then((res) => {
          if (res.data.status === 'OK') {
            router.push('/password_reset/done')
          }
        })
        .catch((_err) => {
          commit('cartSnack', {
            show: true,
            color: 'red darken-3',
            text: 'An error has ocurred, try again!'
          })
        })
    },
    async resetPasswordConfirm ({ commit }, payload) {
      const token = payload.token
      const password = payload.password
      await axios.post(`http://127.0.0.1:8000/api/password_reset/confirm/?token=${token}`, {
        password: password,
        token: token
      })
        .then((res) => {
          if (res.data.status === 'OK') {
            router.push('/login')
          }
        })
        .catch((_err) => {
          commit('cartSnack', {
            show: true,
            color: 'red darken-3',
            text: 'An error has ocurred, try again!'
          })
        })
    },
    async logout ({ commit }) {
      const res = await axios.post('http://127.0.0.1:8000/users/logout/')
      if (res) {
        commit('LOGOUT')
        delete axios.defaults.headers.common['Authorization']
        router.push('/login')
      }
    }
  }
})
