<template>
  <v-container class="grey lighten-5">
    <v-row class="justify-center mt-5" no-gutters>
      <v-col
        class="pa-3"
        cols="12"
        sm="6"
      >
        <v-card v-if="isLogin == false"
          elevation="2"
          class="mx-auto py-3"
        >
          <v-card
            color="#385F73"
            class="ma-5"
            dark
          >
            <v-card-title class="text-h5">
              Shop as a Guest!
            </v-card-title>

            <v-card-subtitle>Fill out a complete form to finish the transaction.</v-card-subtitle>

            <v-card-actions>
              <v-btn
                to='/guest-form'
                text
              >
                Shop Now
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-card>
      </v-col>
      <!-- card separation -->
      <v-col
        class="pa-3"
        cols="12"
        sm="6"
      >
        <v-card v-if="isLogin == false"
          elevation="2"
          class="mx-auto py-3"
        >
          <v-card
            color="#5A6978"
            class="ma-5"
            dark
          >
            <v-card-title class="text-h5">
              Sign In
            </v-card-title>

            <v-card-subtitle>Shop with your information in our records.</v-card-subtitle>

            <v-card-actions>
              <v-btn to='/login' text>
                Log In
              </v-btn>
              <v-btn
                to='/register'
                text
              >
                Register
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-card>
      </v-col>
      <!-- end -->
      <v-col v-if="isLogin == true"
        cols="12"
      >
        {{ $router.push({ path: '/checkout' }) }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PreCheckout',

  computed: {
    ...mapGetters({
      isLogin: 'isLoggedIn'
    })
  }
}
</script>
