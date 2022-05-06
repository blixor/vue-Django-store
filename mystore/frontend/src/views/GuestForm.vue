<template>
  <v-container class="grey lighten-5 mt-10 mb-16">
    <v-row
      v-if="isCart >= 1"
      class="d-flex justify-center"
      no-gutters
    >
      <v-card
        elevation="1"
        class="mx-auto"
        width="450"
      >
        <v-form @submit.prevent="submit">
          <v-card-text>
            <p class="text-h4 text--primary mt-5 text-center">
              Fill out Your information
            </p>
            <p class="text-center">
              SubTotal: <b>${{ subTotal }}</b>
            </p>
            <v-divider></v-divider>
            <p class="red--text">*Fill all the Blanks</p>
            <v-col
              cols="12"
            >
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
                v-model="phone"
                @propValue="phone = $event"
                value="phone"
                label="Telephone"
                name="phone"
                :counter="10"
                propRules="required|digits:10"
              />
              <FormInput
                v-model="address"
                @propValue="address = $event"
                label="Address"
                value="address"
                name="address"
                propRules="required"
              />
            </v-col>
            <v-row no-gutters>
              <v-col cols='4'>
                <FormInput
                  class="mr-2"
                  v-model="city"
                  @propValue="city = $event"
                  label="City"
                  name="city"
                  propRules="required"
                />
              </v-col>
              <v-col
                cols='4'
              >
                <FormInput
                  class="mx-5"
                  v-model="state"
                  @propValue="state = $event"
                  @input="(val) => (state = state.toUpperCase())"
                  :stateInput="true"
                  :counter="2"
                  label="State"
                  name="state"
                  propRules="required|max:2"
                />
              </v-col>
              <v-col
                cols='4'
              >
              <FormInput
                v-model="zipcode"
                @propValue="zipcode = $event"
                value="zipcode"
                label="Zipcode"
                name="zipcode"
                :counter="5"
                propRules="required|digits:5"
              />
              </v-col>
            </v-row>
          </v-card-text>
          <div class="float-right">
            <v-btn
              type="submit"
              class="ma-3"
              color="#385F73"
              :loading=loading
              elevation='5'
              dark
            >
              Shop
              <v-icon class="ml-1">mdi-purse</v-icon>
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'GuestForm',

  components: {
    FormInput: () => import('../components/FormInput')
  },

  data () {
    return {
      loading: false,
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipcode: ''
    }
  },

  computed: {
    ...mapGetters({
      isCart: 'cartLen',
      cartTotal: 'cartTotal',
      subTotal: 'subTotal'
    })
  },

  methods: {
    submit () {
      this.loading = true
      const { firstname, lastname, address, city, state, zipcode, email, phone } = this
      if (firstname && lastname && address && city && state && zipcode && email && phone) {
        this.$store.commit('guestUser', {
          first_name: firstname,
          last_name: lastname,
          email,
          phone,
          address,
          city,
          state,
          zipcode
        })
        this.$router.push('/checkout')
      } else {
        this.loading = false
      }
    }
  }
}
</script>
