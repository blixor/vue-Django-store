<template>
  <div>
    <v-alert
      prominent
      type="error"
    >
      <v-row align="center">
        <v-col class="grow">
          Delete your account. This action is <strong>irrevocable</strong>. Please be certain of this action!
        </v-col>
        <v-col class="shrink">
          <v-btn @click.stop="dialog = true">Delete Your Account</v-btn>
        </v-col>
      </v-row>
    </v-alert>
    <!-- Dialog -->
    <v-dialog
      v-model="dialog"
      max-width="300"
    >
      <v-card>
        <v-card-title class="text-h5">
          Are you sure you want<br> to delete your account?
        </v-card-title>

        <v-card-text>
          If you delete your account, you cannot restore it back, be certain of this action.
        </v-card-text>

        <FormInput
          class="ma-3"
          v-model="password"
          @propValue="password = $event"
          value='password'
          label="Password"
          :passwordInput="true"
          name="password"
          propRules="required|min:8|max:20"
          hint="Enter Your Current Password"
        />
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red darken-3"
            text
            @click="deleteAccount"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: 'DeleteProfile',

  components: {
    FormInput: () => import('../components/FormInput')
  },

  data () {
    return {
      dialog: this.dialog,
      show: false,
      password: ''
    }
  },

  methods: {
    deleteAccount () {
      this.dialog = false
      const username = this.$store.state.user.username
      const password = this.password
      this.$store.dispatch('delete', { username, password })
    }
  }
}
</script>
