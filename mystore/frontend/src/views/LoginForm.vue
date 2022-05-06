<template>
  <v-container class="grey lighten-5 mt-10 mb-16">
    <v-row no-gutters class="d-flex justify-center">
    <v-card
      elevation="1"
      class="mx-auto"
      max-width="400"
    >
      <v-form @submit.prevent="login">
        <v-card-text>
          <p class="text-h4 text--primary mt-5">
            Login to Your Account!
          </p>
          <v-divider></v-divider>
          <p class="red--text">*Fill all the Blanks</p>
          <!-- email -->
          <v-col
            cols="12"
          >
            <FormInput
              v-model="username"
              @propValue="username = $event"
              value='username'
              label="User Name"
              name="username"
              propRules="required"
            />
          </v-col>
          <!-- password -->
          <v-col
            cols="12"
          >
            <FormInput
              v-model="password"
              @propValue="password = $event"
              value='password'
              label="Password"
              :passwordInput="true"
              name="password"
              propRules="required|min:8|max:20"
            />
          </v-col>
          <div
            v-if="this.$store.state.status === 'Please try again!'"
            class="red--text text-center">
            {{ this.$store.state.status }}
          </div>
          <div class="text--primary">
            <v-btn
              text
              color="primary"
              to="/password_reset"
            >
              Forgot your Password?
            </v-btn>
          </div>
        </v-card-text>
        <div class="float-right">
          <v-btn
            type="submit"
            class="ma-3"
            color="primary"
            :loading=loading
          >
            Sign In
          </v-btn>
        </div>
      </v-form>
    </v-card>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LoginForm',

  components: {
    FormInput: () => import('../components/FormInput')
  },

  data () {
    return {
      loading: false,
      csrftoken: '',
      password: '',
      username: ''
    }
  },

  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
      cartLen: 'cartLen',
      authStatus: 'authStatus'
    })
  },

  mounted () {
    if (document.cookie && document.cookie !== '') {
      const token = document.cookie.split('=')
      if (token[0] === 'csrftoken') {
        this.csrftoken = decodeURIComponent(token[1]).trim()
      }
    }
  },

  methods: {
    login () {
      this.loading = true
      const { username, password, csrftoken } = this
      this.$store.dispatch('login', { username, password, csrftoken })
        .then((_res) => {
          if (this.$store.state.status === 'Please try again!') {
            this.loading = false
          }
          // Grant access
          if (this.authStatus === 'success' && this.isLoggedIn) {
            this.cartLen >= 1
              ? this.$router.push('/checkout')
              : this.$router.push('/')
          }
        })
    }
  }
}
</script>
