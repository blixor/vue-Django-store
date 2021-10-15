<template>
  <v-container>
    <v-row v-if="isLogin == true" no-gutters>
      <v-col
        cols="12"
      >
      <h1 class="text-center">{{ this.$store.state.user.first_name }}
        {{ this.$store.state.user.last_name }} Account</h1>
        <v-form @submit.prevent="updateProfile">
          <v-row no-gutters class="grey lighten-5 mt-5">
            <v-col
              class="mt-3 mx-sm-15"
            >
            <v-card-text>
              <v-row>
                <h3>Username: {{ this.$store.state.user.username }}</h3>
              </v-row>
              <v-row class="mt-7">
                <h3>Email: {{ this.$store.state.user.email }}</h3>
              </v-row>
            </v-card-text>
            <!-- Address -->
            <v-text-field
              class="mt-5"
              v-model="address"
              :rules="[rules.required]"
              label="Address"
              placeholder="Address"
              required
            ></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters class="grey lighten-5">
            <v-col
              class="text-center"
              cols="12"
              sm="6"
              md="6"
            >
              <v-col
                cols="12"
              >
                <!-- City -->
                <v-text-field
                  v-model="city"
                  :rules="[rules.required]"
                  label="City"
                  placeholder="City"
                  required
                  rounded
                  filled
                  dense
                ></v-text-field>
                <!-- state -->
                <v-text-field
                  v-model="state"
                  :rules="[rules.required, rules.min]"
                  label="state"
                  placeholder="State"
                  required
                  counter
                  rounded
                  filled
                  dense
                ></v-text-field>
              </v-col>
            </v-col>
            <!-- Column -->
            <v-col
              class="text-center"
              cols="12"
              sm="6"
              md="6"
            >
              <v-col
                cols="12"
              >
              <!-- zipcode -->
              <v-text-field
                v-model="zipcode"
                label="Zipcode"
                placeholder="Zipcode"
                :rules="[rules.required, rules.num]"
                required
                rounded
                filled
                dense
              ></v-text-field>
              <!-- Phone -->
              <v-text-field
                v-model="phone"
                label="Telephone"
                placeholder="Telephone"
                :rules="[rules.required, rules.num, rules.numMin]"
                required
                counter
                rounded
                filled
                dense
              ></v-text-field>
              </v-col>
            </v-col>
            <v-btn
              class="mx-auto mb-5 white--text"
              color="deep-purple darken-2"
              type="submit"
              elevation="5"
              :loading=loading
              rounded
            >Edit Your Address
            </v-btn>
          </v-row>
        </v-form>
        <!-- Second Form -->
        <v-form @submit.prevent="changePassword">
          <v-row no-gutters class="grey lighten-5 mt-5">
            <v-col
              class="mt-3 text-center mx-sm-15"
            >
              <v-text-field
                class="mt-3"
                v-model="old_password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required]"
                :type="show ? 'text' : 'password'"
                hint="Enter Your Current Password"
                persistent-hint
                label="Old Password"
                @click:append="show = !show"
                counter
                rounded
                filled
                required
                dense
              ></v-text-field>
              <v-text-field
                class="mt-3"
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.pass, rules.digit, rules.letter]"
                :type="show1 ? 'text' : 'password'"
                hint="At least 8 characters, use numbers and letters"
                persistent-hint
                label="Password"
                @click:append="show1 = !show1"
                counter
                rounded
                filled
                required
                dense
              ></v-text-field>
              <v-text-field
                class="mt-3"
                v-model="password2"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.pass, rules.digit, rules.letter]"
                :type="show2 ? 'text' : 'password'"
                hint="Passwords must be different than your personal info"
                label="Confirm new Password"
                @click:append="show2 = !show2"
                counter
                rounded
                filled
                required
                dense
              ></v-text-field>
              <!-- password match message -->
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
                :loading=loading2
                rounded
              >Edit Your Password
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <!-- DELETE ACCOUNT ALERT BOX -->
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
              Are you sure you want to delete your account?
            </v-card-title>

            <v-card-text>
              If you delete your account, you cannot restore it back, be certain of this action.
            </v-card-text>

            <v-text-field
              class="ma-3"
              v-model="old_password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required]"
              :type="show ? 'text' : 'password'"
              hint="Enter Your Current Password"
              persistent-hint
              label="Password"
              @click:append="show = !show"
              outline
              required
              dense
            ></v-text-field>

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
      </v-col>
    </v-row>
    <v-row v-else no-gutters>
      <h3>You're not authorized</h3>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',

  computed: {
    ...mapGetters({
      isLogin: 'isLoggedIn'
    })
  },

  data () {
    return {
      loading: false,
      loading2: false,
      address: this.$store.state.user.address,
      city: this.$store.state.user.city,
      state: this.$store.state.user.state,
      zipcode: this.$store.state.user.zipcode,
      phone: this.$store.state.user.phone || '',
      dialog: false,
      show: false,
      show1: false,
      show2: false,
      validation: true,
      file: {},
      message: '',
      old_password: '',
      password: '',
      password2: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => v.length <= 50 || 'E-mail must be less than 50 characters',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      rules: {
        required: value => !!value || 'Required',
        min: v => v.length < 3 || 'Min 2 characters',
        num: v => !/\D/.test(v) || 'Only numbers allowed',
        pass: v => v.length >= 8 || 'Min 8 characters',
        numMin: v => v.length === 10 || 'Enter exactly 10 numbers',
        digit: value => /\d/.test(value) || 'Insert Numbers Please',
        letter: value => /[A-z ]/.test(value) || 'Insert a letter Please'
      }
    }
  },

  methods: {
    updateProfile () {
      this.loading = true
      const address = this.address
      const city = this.city
      const state = this.state
      const zipcode = this.zipcode
      const phone = this.phone
      this.$store.dispatch('update', { address, city, state, zipcode, phone })
        .then((_res) => {
          this.loading = false
        }).catch((_err) => {
          this.loading = false
          const show = true
          const color = 'red darken-3'
          const text = 'Unable to send, check your form!'
          this.$store.commit('cartSnack', { show, color, text })
        })
    },
    changePassword () {
      this.loading2 = true
      if (this.password !== this.password2) {
        this.message = 'Unmatched Passwords, try again!'
        this.loading2 = false
      } else {
        this.loading2 = true
        const old_password = this.old_password
        const password = this.password
        const password2 = this.password2
        this.$store.dispatch('changePassword', { old_password, password, password2 })
      }
    },
    deleteAccount () {
      this.dialog = false
      const username = this.$store.state.user.username
      const password = this.old_password
      this.$store.dispatch('delete', { username, password })
    }
  }
}
</script>
