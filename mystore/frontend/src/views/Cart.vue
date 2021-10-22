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
      <!-- Sub total card -->
        <v-card
          class="pa-2 mb-16 mt-5 text-center"
          elevation="3"
        >
          <h2 class="mb-2">Sub Total</h2>

          <v-divider></v-divider>

          <v-row
            no-gutters
          >
            <v-col
              class="mt-3"
              cols="6"
            >
              <h3 class="my-1">Subtotal:</h3>
            </v-col>
            <v-col
              class="mt-3"
              cols="6"
            >
              <h3 class="my-1">${{ subTotal }}</h3>
            </v-col>
          </v-row>
          <v-card-actions v-if="$store.state.cart.length > 0">
            <v-btn to="/pre-checkout"
              block
              color="#385F73"
              class="mt-3"
              elevation="2"
              rounded
              dark
            >Sub Total</v-btn>
          </v-card-actions>

          <p v-if="$store.state.cart.length >= 1"
             class="text-caption">
             *Review your transaction in next page.
          </p>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Cart',

  computed: {
    subTotal () {
      return this.$store.getters.cartTotal
    }
  },

  methods: {
    Remove (itemId) {
      this.$store.commit('remove', itemId)
    }
  }
}
</script>
