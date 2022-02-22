<template>
  <v-img
    :height="height"
    :width="width"
    :max-height="maxHeight"
    :max-width="maxWidth"
    :src="src"
    :lazy-src="src"
    :alt="alt"
    :contain="contain"
    :transition="transition"
  ></v-img>
</template>
<script>
export default {
  name: 'Images',

  props: {
    src: String,
    height: Number,
    width: Number,
    maxHeight: Number,
    maxWidth: Number,
    contain: Boolean,
    transition: String,
    alt: String
  }
}
</script>
