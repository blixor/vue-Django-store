<template>
    <v-container class="grey lighten-5 mt-10 mb-16">
    <v-row no-gutters class="d-flex justify-center">
    <v-card
      elevation="1"
      class="mx-auto"
      max-width="400"
    >
      <v-form @submit.prevent="changePassword">
        <v-card-text>
          <p class="text-h4 text--primary mt-5">
            Insert a New Password!
          </p>
          <v-divider></v-divider>
          <p class="red--text">*Fill all the Blanks</p>
          <!-- password -->
          <v-col
            cols="12"
          >
            <v-text-field
              v-model="password1"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              hint="At least 8 characters"
              label="New Password"
              @click:append="show1 = !show1"
              counter
              outlined
              required
              dense
            ></v-text-field>
            <!-- confirm password -->
            <v-text-field
              v-model="password2"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show2 ? 'text' : 'password'"
              hint="At least 8 characters"
              label="Confirm new Password"
              @click:append="show2 = !show2"
              counter
              outlined
              required
              dense
            ></v-text-field>
          </v-col>
          <!-- password match message -->
          <h4
            v-show="validation"
            class="text-center red--text"
            v-text="message"
          >
          </h4>
        </v-card-text>
        <div class="float-right">
          <v-btn
            type="submit"
            class="ma-3"
            color="primary"
            :loading=loading
          >
            Change your Password
          </v-btn>
        </div>
      </v-form>
    </v-card>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'PasswordResetConfirm',

  data () {
    return {
      show1: false,
      show2: false,
      loading: false,
      validation: true,
      message: '',
      password1: '',
      password2: '',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters'
      }
    }
  },

  methods: {
    changePassword () {
      this.loading = true
      if (this.password1 !== this.password2) {
        this.message = 'Passwords did not match!'
        this.loading = false
      } else {
        // send to vuex
        const token = this.$route.query.token
        const password = this.password2
        this.$store.dispatch('resetPasswordConfirm', { password, token })
          .then((_res) => {
            this.loading = false
          })
      }
    }
  }
}
</script>
