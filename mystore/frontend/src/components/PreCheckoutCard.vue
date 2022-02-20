<template>
  <v-card
    :color="color"
    :dark="dark"
  >
    <v-card-title class="text-h5">
      {{ title }}
    </v-card-title>

    <v-card-subtitle>
      {{ subtitle }}
    </v-card-subtitle>

    <v-card-actions v-if="user">
      <v-btn to='/login' text>
        Log In
      </v-btn>
      <v-btn
        to='/register'
        text
      >
        Register
      </v-btn>
    </v-card-actions>

    <v-card-actions v-if="!user">
      <v-btn
        to="/guest-form"
        :text="text"
      >
        {{ btnText }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'PreCheckoutCard',

  props: {
    user: Boolean,
    color: String,
    dark: Boolean,
    title: String,
    subtitle: String,
    text: Boolean,
    btnText: String
  }
}
</script>
