<template>
  <v-container>
    <v-row v-if="isLogin == true" no-gutters>
      <v-col
        cols="12"
      >
        <UpdateProfile />
        <UpdatePassword />
        <DeleteProfile />
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

  components: {
    UpdateProfile: () => import('../components/UpdateProfile'),
    UpdatePassword: () => import('../components/UpdatePassword'),
    DeleteProfile: () => import('../components/DeleteProfile')
  },

  computed: {
    ...mapGetters({
      isLogin: 'isLoggedIn'
    })
  }
}
</script>
