<template>
  <v-container class="grey lighten-5">
    <v-row class="justify-center" no-gutters>
      <v-card v-if="isLogin == false"
        elevation="1"
        width="600px"
        class="mx-auto my-16"
      >
        <v-row no-gutters>
          <v-col cols="6">
            <v-card
              color="#385F73"
              class="ma-3"
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
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="6">
            <v-card
              color="#5A6978"
              class="ma-3"
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
                  class="hidden-xs-only"
                  to='/register'
                  text
                >
                  Register
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card>

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
