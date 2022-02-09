<template>
  <v-alert
    :type="type"
    :border="border"
    :color="color"
    :icon="icon"
    :text="text"
    :dark="dark"
    :dense="dense"
    :prominent="prominent"
  >
    {{ message }}
  </v-alert>
</template>

<script>
export default {
  name: 'Alert',

  props: {
    type: String,
    border: String,
    color: String,
    icon: String,
    text: Boolean,
    dark: Boolean,
    dense: Boolean,
    prominent: Boolean,
    message: String
  }
}
</script>
