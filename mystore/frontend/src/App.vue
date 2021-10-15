<template>
  <v-app>
    <v-main>
      <nav-bar />
      <router-view/>
      <Footer />
      <snack-bar />
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar'
import Footer from './components/Footer'

export default {
  name: 'App',

  components: {
    NavBar,
    Footer,
    SnackBar: () => import('./components/SnackBar')
  }
}
</script>
