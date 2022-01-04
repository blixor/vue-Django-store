<template>
  <v-snackbar
    class="mt-15"
    v-model="$store.state.snackbar.show"
    :color="$store.state.snackbar.color"
    timeout="4000"
    right
    top
  >
    {{ this.$store.state.snackbar.text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="white"
        text
        v-bind="attrs"
        @click="$store.commit('cartSnack', { show: false })"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'SnackBar'

}
</script>
