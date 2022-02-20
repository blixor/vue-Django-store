<template>
  <v-img
    :height="height"
    :width="width"
    :src="src"
    :lazy-src="src"
    :alt="alt"
    :contain="contain"
    :transition="transition"
  ></v-img>
</template>
<script>
export default {
  name: 'ItemImage',

  props: {
    src: String,
    height: Number,
    width: Number,
    contain: Boolean,
    transition: String,
    alt: String
  }
}
</script>
