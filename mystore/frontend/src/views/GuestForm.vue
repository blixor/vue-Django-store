<template>
  <v-container class="grey lighten-5 mt-10 mb-16">
    <v-row no-gutters class="d-flex justify-center">
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
          <!-- email -->
          <v-col
            cols="12"
          >
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
            <v-text-field
              v-model="phone"
              label="Telephone"
              placeholder="Telephone"
              :rules="[rules.required, rules.num, rules.numMin]"
              required
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="address"
              :rules="[rules.required]"
              label="Address"
              placeholder="Address"
              required
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-row no-gutters>
            <v-col cols='4'>
              <v-text-field
                class="mr-2"
                v-model="city"
                :rules="[rules.required]"
                label="City"
                placeholder="City"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col
              cols='4'
            >
              <v-text-field
                @input="(val) => (state = state.toUpperCase())"
                class="mx-5"
                v-model="state"
                :rules="[rules.required, rules.min]"
                label="state"
                placeholder="State"
                required
                counter
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col
              cols='4'
            >
              <v-text-field
                v-model="zipcode"
                label="Zipcode"
                placeholder="Zipcode"
                :rules="[rules.required, rules.num]"
                required
                outlined
                dense
              ></v-text-field>
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
export default {
  name: 'GuestForm',

  data () {
    return {
      show1: false,
      show2: false,
      loading: false,
      firstname: '',
      lastname: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
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
        min: v => v.length < 3 || 'Min 2 characters',
        num: v => !/\D/.test(v) || 'Only numbers allowed',
        pass: v => v.length >= 8 || 'Min 8 characters',
        numMin: v => v.length === 10 || 'Enter exactly 10 numbers',
        digit: value => /\d/.test(value) || 'Insert Numbers Please'
      }
    }
  },

  computed: {
    subTotal () {
      return this.$store.getters.cartTotal
    }
  },

  methods: {
    submit () {
      this.loading = true
    }
  }
}
</script>
