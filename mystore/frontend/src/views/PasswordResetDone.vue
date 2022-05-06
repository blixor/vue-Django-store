<template>
  <div>
    <v-container
      class="grey lighten-5 mt-10 mb-16">
      <v-row no-gutters
        class="d-flex justify-center">
        <Alert
          color="blue-grey"
          type="info"
          :dark=true
          :dense=true
          :prominent=true
          message="An email has been sent with instructions to reset your password!
          If you don’t receive an email, please make sure you’ve entered the address you registered with, and check your spam folder."
        />
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'PasswordResetDone',

  components: {
    Alert: () => import('../components/Alert')
  }
}
</script>
