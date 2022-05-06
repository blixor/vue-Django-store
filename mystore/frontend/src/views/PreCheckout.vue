<template>
  <v-container class="grey lighten-5">
    <v-row
      v-if="isCart >= 1"
      class="justify-center mt-5"
      no-gutters
    >
      <v-col
        class="pa-3"
        cols="12"
        sm="6"
      >
        <v-card v-if="isLogin == false"
          elevation="2"
          class="mx-auto py-3"
        >
          <PreCheckoutCard
            class="ma-5"
            color="#385F73"
            :dark="true"
            title="Shop as a Guest!"
            subtitle="Fill out a complete form to finish the transaction."
            :text="true"
            btnText="Shop Now"
          />
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
          <PreCheckoutCard
            class="ma-5"
            color="#5A6978"
            :dark="true"
            title="Sign In"
            subtitle="Shop with your information in our records."
            :text="true"
            :user="true"
          />
        </v-card>
      </v-col>
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

  components: {
    PreCheckoutCard: () => import('../components/PreCheckoutCard')
  },

  computed: {
    ...mapGetters({
      isLogin: 'isLoggedIn',
      isCart: 'cartLen'
    })
  }
}
</script>
