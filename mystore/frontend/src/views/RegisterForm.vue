<template>
  <v-container class="grey lighten-5 mt-10 mb-16">
    <v-row no-gutters class="d-flex justify-center">
    <v-card
      elevation="1"
      class="mx-auto"
      width="450"
    >
      <v-form @submit.prevent="register">
        <v-card-text>
          <p class="text-h4 text--primary mt-5">
            Register to our Store!
          </p>

          <v-divider></v-divider>

          <p class="red--text">*Fill all the Blanks</p>
          <v-col
            cols="12"
          >
            <FormInput
              v-model="username"
              @propValue="username = $event"
              value='username'
              label="User Name"
              name="username"
              propRules="required|max:50"
            />
            <FormInput
              v-model="firstname"
              @propValue="firstname = $event"
              value='firstname'
              label="First Name"
              name="firstname"
              propRules="required|max:50"
            />
            <FormInput
              v-model="lastname"
              @propValue="lastname = $event"
              value='lastname'
              label="Last Name"
              name="lastname"
              propRules="required|max:50"
            />
            <FormInput
              v-model="email"
              @propValue="email = $event"
              value='email'
              label="E-mail"
              name="email"
              propRules="required|email"
            />
            <FormInput
              v-model="password"
              @propValue="password = $event"
              value='password'
              label="Password"
              name="password"
              propRules="required|min:8|max:20"
              :passwordInput="true"
              hint="At least 8 characters, please include random numbers and letters"
            />
            <FormInput
              v-model="password2"
              @propValue="password2 = $event"
              value='password2'
              label="Confirm new Password"
              name="password"
              propRules="required|min:8|max:20"
              :passwordInput="true"
              hint="At least 8 characters, please include random numbers and letters"
            />
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
            Submit
          </v-btn>
        </div>
      </v-form>
    </v-card>
    </v-row>
  </v-container>
</template>
<script>

export default {
  name: 'RegisterForm',

  components: {
    FormInput: () => import('../components/FormInput')
  },

  data () {
    return {
      loading: false,
      validation: true,
      message: '',
      password: '',
      password2: '',
      username: '',
      firstname: '',
      lastname: '',
      email: ''
    }
  },

  methods: {
    register () {
      this.loading = true
      if (this.password !== this.password2) {
        this.message = 'Unmatched Passwords, try again!'
        this.loading = false
      } else {
        // send to vuex
        this.loading = true
        const { username, email, password, firstname, lastname } = this
        if (username && email && firstname && lastname && password) {
          this.$store.dispatch('register', {
            first_name: firstname,
            last_name: lastname,
            username,
            password,
            email
          })
            .then((_res) => {
              this.loading = false
            }).catch((_err) => {
              this.loading = false
            })
        } else {
          this.loading = false
          this.message = 'Please, fill all the blanks no spaces allowed'
        }
      }
    }
  }
}
</script>
