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
            <v-text-field
              v-model="username"
              :rules="nameRules"
              label="User Name"
              required
              outlined
              dense
            ></v-text-field>
          </v-col>
          <!-- password -->
          <v-col
            cols="12"
          >
            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              hint="At least 8 characters"
              label="Password"
              @click:append="show1 = !show1"
              counter
              outlined
              required
              dense
            ></v-text-field>
          </v-col>
          <div v-if="this.$store.state.status === 'Please try again!'" class="red--text text-center">
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

  data () {
    return {
      show1: false,
      show2: true,
      loading: false,
      csrftoken: '',
      password: '',
      username: '',
      nameRules: [
        v => !!v || 'User Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters'
      }
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
