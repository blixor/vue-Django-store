<template>
  <div class="mt-10">
    <v-footer
      padless
      absolute
      class="mt-10"
    >
      <v-col
        class="text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
