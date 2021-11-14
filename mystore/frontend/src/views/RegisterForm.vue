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
          <!-- email -->
          <v-col
            cols="12"
          >
            <v-text-field
              v-model="username"
              :rules="nameRules"
              label="User Name"
              required
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="firstname"
              :rules="nameRules"
              label="First Name"
              required
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="lastname"
              :rules="nameRules"
              label="Last Name"
              required
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
              outlined
              dense
            ></v-text-field>
          </v-col>
          <!-- password -->
          <v-col
            cols="12"
          >
            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min, rules.digit, rules.letter]"
              :type="show1 ? 'text' : 'password'"
              hint="At least 8 characters, use numbers and letters"
              persistent-hint
              label="Password"
              @click:append="show1 = !show1"
              counter
              outlined
              required
              dense
            ></v-text-field>
            <v-text-field
              v-model="password2"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min, rules.digit, rules.letter]"
              :type="show2 ? 'text' : 'password'"
              hint="Passwords must be different than your personal info"
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

  data () {
    return {
      show1: false,
      show2: false,
      loading: false,
      validation: true,
      message: '',
      password: '',
      password2: '',
      username: '',
      firstname: '',
      lastname: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 20 || 'Name must be less than 20 characters'
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => v.length <= 50 || 'E-mail must be less than 50 characters',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        digit: value => /\d/.test(value) || 'Insert Numbers Please',
        letter: value => /[A-z ]/.test(value) || 'Insert a letter Please'
      }
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
