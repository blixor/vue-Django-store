<template>
  <div>
    <v-app-bar
      fixed
      color="gray-darken-3"
      dark
      app
    >
    <router-link to="/">
        <Images
          alt="Vuetify Logo"
          class="shrink mr-2"
          :contain="true"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          :width="40"
        />
      </router-link>

      <v-toolbar-title>Store</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn
        v-if="isLogin"
        class="mr-3"
        elevation='0'
        to="/profile">
        {{ this.$store.state.user.first_name }}
      </v-btn>

      <v-btn to="/cart" icon>
        <p>{{ count }}</p>
        <v-icon>mdi-cart</v-icon>
      </v-btn>

      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      right
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item to="/cart">
            <v-list-item-icon>
              <v-icon>mdi-cart</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Cart</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="isLogin != true" to="/login">
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="isLogin != true" to="/register">
            <v-list-item-icon>
              <v-icon>mdi-clipboard-check</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Sign Up</v-list-item-title>
          </v-list-item>

          <div v-if="isLogin">
          <v-list-item to='/profile'>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>

          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
          </div>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavBar',

  components: {
    Images: () => import('./Images')
  },

  data: () => ({
    drawer: false,
    group: null
  }),

  computed: {
    ...mapGetters({
      count: 'cartLen',
      isLogin: 'isLoggedIn'
    })
  },

  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>
