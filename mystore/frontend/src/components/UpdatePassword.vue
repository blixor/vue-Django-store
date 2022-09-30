<template>
  <div>
    <v-form @submit.prevent="changePassword">
    <v-row no-gutters class="grey lighten-5 mt-5">
      <v-col
        class="mt-3 text-center mx-sm-15"
      >
        <FormInput
          class="mt-3"
          v-model="old_password"
          @propValue="old_password = $event"
          value='old_password'
          label="Old Password"
          :passwordInput="true"
          name="old password"
          propRules="required|min:8|max:20"
          hint="Enter Your Current Password"
        />
        <FormInput
          class="mt-3"
          v-model="password"
          @propValue="password = $event"
          value='password'
          label="Password"
          :passwordInput="true"
          name="password"
          propRules="required|min:8|max:20"
          hint="At least 8 characters, use random numbers and letters"
        />
        <FormInput
          class="mt-3"
          v-model="password2"
          @propValue="password2 = $event"
          value='password2'
          label="Confirm New Password"
          :passwordInput="true"
          name="password"
          propRules="required|min:8|max:20"
          hint="Passwords must be different than your personal info"
        />
        <h4
          v-show="validation"
          class="text-center red--text"
          v-text="message"
        >
        </h4>
        <v-btn
          class="mx-auto mb-15 mt-5 white--text"
          color="deep-purple darken-2"
          type="submit"
          elevation="5"
          :loading=loading
          rounded
        >Edit Your Password
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
  </div>
</template>
<script>
export default {
  name: 'UpdatePassword',

  components: {
    FormInput: () => import('../components/FormInput')
  },

  data () {
    return {
      loading: false,
      validation: true,
      message: '',
      old_password: '',
      password: '',
      password2: ''
    }
  },
  methods: {
    changePassword () {
      this.loading = true
      if (this.password !== this.password2) {
        this.message = 'Unmatched Passwords, try again!'
        this.loading = false
      } else {
        this.loading = true
        const { old_password, password, password2 } = this
        if (old_password && password && password2) {
          this.$store.dispatch('changePassword', { old_password, password, password2 })
            .catch((_err) => {
              this.loading = false
              const show = true
              const color = 'red darken-3'
              const text = 'An error has ocurred, check your password!'
              this.$store.commit('cartSnack', { show, color, text })
            })
        } else {
          this.loading = false
        }
      }
    }
  }
}
</script>
