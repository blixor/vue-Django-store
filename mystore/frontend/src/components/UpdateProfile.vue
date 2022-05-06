<template>
  <div>
  <h1 class="text-center">
    {{ first_name }} {{ last_name }} Account
  </h1>
  <v-form @submit.prevent="updateProfile">
    <v-row no-gutters class="grey lighten-5 mt-5">
      <v-col
        class="mt-3 mx-sm-15"
      >
      <v-card-text>
        <v-row>
          <h3>Username: {{ username }}</h3>
        </v-row>
        <v-row class="mt-7">
          <h3>Email: {{ email }}</h3>
        </v-row>
      </v-card-text>
      <!-- Address -->
      <FormInput
        class="mt-5"
        v-model="address"
        @propValue="address = $event"
        label="Address"
        value="address"
        name="address"
        propRules="required"
      />
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
          <FormInput
            v-model="city"
            @propValue="city = $event"
            label="City"
            name="city"
            propRules="required"
          />
          <!-- state -->
          <FormInput
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
        <FormInput
          v-model="zipcode"
          @propValue="zipcode = $event"
          value="zipcode"
          label="Zipcode"
          name="zipcode"
          :counter="5"
          propRules="required|digits:5"
        />
        <!-- Phone -->
        <FormInput
          v-model="phone"
          @propValue="phone = $event"
          value="phone"
          label="Telephone"
          name="phone"
          :counter="10"
          propRules="required|digits:10"
        />
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
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'updateProfile',

  components: {
    FormInput: () => import('../components/FormInput')
  },

  computed: {
    ...mapState({
      first_name: state => state.user.first_name,
      last_name: state => state.user.last_name,
      username: state => state.user.username,
      email: state => state.user.email
    })
  },

  data () {
    return {
      loading: false,
      address: this.$store.state.user.address,
      city: this.$store.state.user.city,
      state: this.$store.state.user.state,
      zipcode: this.$store.state.user.zipcode,
      phone: this.$store.state.user.phone || ''
    }
  },

  methods: {
    updateProfile () {
      this.loading = true
      const { address, city, state, zipcode, phone } = this
      if (address && city && state && zipcode && phone) {
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
      } else {
        this.loading = false
      }
    }
  }
}
</script>
