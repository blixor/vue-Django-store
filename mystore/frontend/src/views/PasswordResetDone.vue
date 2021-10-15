<template>
  <div>
    <v-container class="grey lighten-5 mt-10 mb-16">
      <v-row no-gutters class="d-flex justify-center">
        <v-alert
          color="blue-grey"
          type="info"
          dark
          dense
          prominent
        >
          An email has been sent with instructions to reset your password!
          If you don’t receive an email, please make sure you’ve entered the address you registered with, and check your spam folder.
        </v-alert>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'PasswordResetDone'
}
</script>
