<template>
  <div>
    <v-card
      max-width="344"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-avatar
          tile
          size="140"
        >
        <!-- TODO: SEPARATE IMG -->
        <v-img
          :lazy-src="image"
          :src="image"
        ></v-img>

        </v-list-item-avatar>

        <v-list-item-content>
          <div class="overline mb-4">
            Price: ${{ price }}
          </div>
          <v-list-item-title class="headline mb-1">
            {{ name }}
          </v-list-item-title>
          <v-list-item-subtitle>Qty: {{ qty }}</v-list-item-subtitle>
          <v-list-item-subtitle>Total: $ {{ parseFloat(qty * price).toFixed(2) }}</v-list-item-subtitle>
        </v-list-item-content>

      </v-list-item>

      <v-card-actions class="justify-end">
        <v-btn
          @click="Remove(itemId)"
          color="red"
          outlined
          rounded
          text
        >
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'Card',

  props: {
    image: String,
    price: String,
    name: String,
    qty: Number,
    itemId: Number
  },

  methods: {
    Remove (itemId) {
      this.$store.commit('remove', itemId)
    }
  }
}
</script>
