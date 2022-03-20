<template>
  <div>
    <v-container class="grey lighten-5 mt-10 mb-16">
      <v-row no-gutters class="d-flex justify-center">
        <v-card
          width="450"
          elevation="1"
          class="mx-auto"
          max-width="500"
        >
          <v-form @submit.prevent="reset">
            <p class="text-h4 text--primary mt-5 mb-5 text-center">
              Reset Your Password!
            </p>
              <!-- email -->
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            <div class="float-right">
              <v-btn
                type="submit"
                class="ma-3"
                color="primary"
                :loading=loading
              >
                Reset
                <v-icon
                  class="ml-2"
                  small
                >
                  mdi-email
                </v-icon>
              </v-btn>
            </div>
          </v-form>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'PasswordReset',

  data () {
    return {
      loading: false,
      csrftoken: '',
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => v.length <= 30 || 'E-mail must be less than 30 characters',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ]
    }
  },

  methods: {
    reset () {
      this.loading = true
      const email = this.email
      this.$store.dispatch('passwordReset', email)
        .then((_res) => {
          this.loading = false
        }).catch((_err) => {
          this.loading = false
          const show = true
          const color = 'red darken-3'
          const text = 'Server Error, Try Again Later'
          this.$store.commit('cartSnack', { show, color, text })
        })
    }
  }
}
</script>
