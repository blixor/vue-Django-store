<template>
  <v-container class="grey lighten-5 mt-5">
    <v-row
      v-if="isCart >= 1"
        class="justify-center"
      >
      <Alert
        class="ma-5 mt-7 subtitle-1"
        color="#445F44"
        border="left"
        icon="mdi-account"
        :dark=true
        :text=false
        :dense=false
        :message="message"
      />
    </v-row>
    <v-row no-gutters>
      <v-col
        cols="12"
        md="6"
        sm="6"
      >
        <div v-if="isCart === 0">
          <h3
            class="text-center mt-16"
          >Your Cart is Empty!
          </h3>
          <div class="text-center mt-5">
            <v-btn
              to="/"
              rounded
              color="deep-purple"
              dark
            >
              Visit our Store!
            </v-btn>
          </div>
        </div>

        <v-col
          v-for="(item, index) in $store.state.cart"
          :key="item.itemId"
          :index="index"
          cols="12"
        >
          <Card
            class="mx-auto mt-5"
            :image="item.image"
            :price="item.price"
            :name="item.name"
            :qty="item.qty"
            :itemId="item.itemId"
            :checkout="true"
          />
        </v-col>
      </v-col>
      <v-col
        order="first" order-sm="last"
        class="mt-7"
        cols="12"
        md="6"
        sm="6"
      >
      <!-- Grand Total -->
        <v-card
          class="pa-2 mb-16 mt-1 text-center"
          elevation="3"
        >
          <h2>Your Total !</h2>

          <v-row
            no-gutters
          >
            <v-col
              class="mt-3"
              cols="6"
            >
            <h3 class="mb-1">Subtotal:</h3>
            <h3 class="mb-1">Shipping:</h3>
            <h3 class="mb-1">Tax (11.5%):</h3>

            <v-divider></v-divider>

            <h3 class="mt-1">Total:</h3>
            </v-col>
            <v-col
              class="mt-3"
              cols="6"
            >
            <h3 class="mb-1">${{ subTotal }}</h3>
            <h3 class="mb-1">$ 0.00</h3>
            <h3 class="mb-1">${{ tax }}</h3>

            <v-divider></v-divider>

            <h3 class="mt-1">${{ grandTotal }}</h3>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-btn v-if="isCart >= 1"
              @click="Submit"
              :loading="loading"
              block
              color="success"
              class="mt-3"
              elevation="2"
              rounded
              dark
            >Pay ${{ grandTotal }} <v-icon class="ml-2">mdi-basket</v-icon></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Checkout',

  components: {
    Alert: () => import('../components/Alert'),
    Card: () => import('../components/CheckoutCard')
  },

  data: () => ({
    loading: false
  }),

  computed: {
    ...mapGetters({
      isCart: 'cartLen',
      subTotal: 'subTotal',
      tax: 'tax',
      grandTotal: 'grandTotal'
    }),
    ...mapState({
      first_name: state => state.user.first_name,
      last_name: state => state.user.last_name,
      address: state => state.user.address,
      city: state => state.user.city,
      state: state => state.user.state,
      zipcode: state => state.user.zipcode,
      phone: state => state.user.phone,
      email: state => state.user.email
    }),
    message () {
      if (this.address !== '') {
        return `Name: ${this.first_name} ${this.last_name} | address:
                ${this.address} ${this.city} ${this.state},
                ${this.zipcode} | phone: ${this.phone} | email: ${this.email}`
      } else {
        return 'Please Sign In or go to your Account; We do not have your shipping info!'
      }
    }
  },

  methods: {
    Submit () {
      this.loading = true

      this.$store.dispatch('checkout')
        .catch((_err) => {
          this.loading = false
          const show = true
          const color = 'red darken-3'
          const text = 'An error has ocurred try again later'
          this.$store.commit('cartSnack', { show, color, text })
        })
    }
  }
}
</script>
