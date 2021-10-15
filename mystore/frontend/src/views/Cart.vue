<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col
        cols="12"
        md="8"
        sm="6"
      >
        <div v-if="$store.state.cart.length === 0">
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
          <v-card
            class="mx-auto mt-5"
            max-width="344"
            outlined
          >
            <v-list-item three-line>
              <v-list-item-avatar
                tile
                size="140"
              >

              <v-img
                :lazy-src="item.image"
                :src="item.image"
              ></v-img>

              </v-list-item-avatar>

              <v-list-item-content>
                <div class="overline mb-4">
                  Price: ${{ item.price }}
                </div>
                <v-list-item-title class="headline mb-1">
                  {{ item.name }}
                </v-list-item-title>
                <v-list-item-subtitle>Qty: {{ item.qty }}</v-list-item-subtitle>
                <v-list-item-subtitle>Total: $ {{ item.qty * item.price }}</v-list-item-subtitle>
              </v-list-item-content>

            </v-list-item>

            <v-card-actions class="justify-end">
              <v-btn
                @click="Remove(item.itemId)"
                color="red"
                outlined
                rounded
                text
              >
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-col>
      <v-col
        order="first" order-sm="last"
        class="mt-7"
        cols="12"
        md="4"
        sm="6"
      >
        <v-card
          class="pa-2 mb-16 mt-5 text-center"
          elevation="3"
          tile
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
            <h3 class="mb-1">Tax (11.5%):</h3>

            <v-divider></v-divider>

            <h3 class="mt-1">Total:</h3>
            </v-col>
            <v-col
              class="mt-3"
              cols="6"
            >
            <h3 class="mb-1">${{ subTotal }}</h3>
            <h3 class="mb-1">${{ tax }}</h3>

            <v-divider></v-divider>

            <h3 class="mt-1">${{ total }}</h3>
            </v-col>
          </v-row>
          <v-card-actions v-if="$store.state.cart.length > 0">
            <v-btn to="/checkout"
              :loading="loading"
              :disabled="disabled"
              block
              color="success"
              class="mt-3"
              elevation="2"
              rounded
            >Checkout</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Cart',

  data: () => ({
    loading: false,
    disabled: false
  }),

  computed: {
    subTotal () {
      return this.$store.getters.cartTotal
    },
    tax () {
      const number = this.subTotal * 0.115
      return number.toFixed(2)
    },
    total () {
      const res = parseFloat(this.subTotal) + parseFloat(this.tax)
      return res.toFixed(2)
    }
  },
  methods: {
    Remove (itemId) {
      this.$store.commit('remove', itemId)
    }
  }
}
</script>
