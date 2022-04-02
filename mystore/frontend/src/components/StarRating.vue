<template>
  <div class="star-rating">
    <v-rating
      v-model=rating
      background-color="deep-purple lighten-2"
      color="amber"
      @input="changeVal(rating, itemId)"
      dense
      size="20"
    ></v-rating>
    <span class="grey--text text--lighten-2 caption mr-2">
      ({{ rating }})
    </span>
  </div>
</template>

<script>

export default {
  name: 'StarRating',

  props: {
    itemId: Number,
    itemRating: String
  },

  data () {
    return {
      rating: parseInt(this.itemRating)
    }
  },

  methods: {
    changeVal (value, itemId) {
      this.$store.commit('starRating', { itemId, value })
    }
  }
}
</script>
