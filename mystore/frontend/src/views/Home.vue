<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col
        cols="12"
        md="10"
      >
      <!-- array of cards -->
        <v-row class="mt-5 mb-16" no-gutters>
          <v-col
            v-for="(product, index) in $store.state.products"
            :key="product.id"
            :index="index"
            cols="6"
            sm="3"
          >
            <v-card
              class="ma-2"
              max-width="200"
            >
              <div v-if="product.inventory < 1">
                <Images
                  :height="250"
                  :src="product.image"
                  :alt="product.name"
                />
              </div>
              <div v-else>
                <router-link :to="'/detail/' + product.slug">
                  <Images
                    :height="250"
                    :src="product.image"
                    :alt="product.name"
                  />
                </router-link>
              </div>

              <v-card-title>{{ product.name }}</v-card-title>

              <v-card-text>
                <v-row
                  align="center"
                  class="mx-0"
                >
                  <!-- Stars -->
                  <StarRating
                    :item-id="product.id"
                    :item-rating="product.rating[0]"
                  />
                </v-row>

                <div class="my-6 subtitle-1">
                  <div v-if="product.inventory < 1">
                    <h4 class="red text-center white--text">Sold Out</h4>
                  </div>
                  <div v-else>
                    <h4>$ {{ product.price }}</h4>
                  </div>
                </div>

                <div class="hidden-sm-and-down">
                  Laborum do dolor occaecat velit id magna pariatur nostrud aute deserunt sit culpa pariatur dolor. Adipisicing esse consectetur enim excepteur.
                </div>
              </v-card-text>

              <v-divider class="mx-4 hidden-sm-and-down"></v-divider>

              <v-card-actions class="hidden-sm-and-down">
                <div v-if="product.inventory < 1">
                  <v-btn
                    color="deep-purple lighten-2"
                    disabled
                    text
                    :to="'/detail/' + product.slug"
                  >
                    Details
                  </v-btn>
                </div>
                <div v-else>
                  <v-btn
                    color="deep-purple lighten-2"
                    text
                    :to="'/detail/' + product.slug"
                  >
                    Details
                  </v-btn>
                </div>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        md="2"
      >
      <!-- ads area -->
        <v-card
          class="mt-5 mb-16 pa-2"
          outlined
          tile
        >
          Ads
          <div
            id="ads"
            style="background: #1d1f29; padding-top:60px; text-align: center;"
          >
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import StarRating from '../components/StarRating'
import Images from '../components/Images'

export default {
  components: { StarRating, Images },

  name: 'Home',

  mounted () {
    this.$store.dispatch('getProducts')
  }
}
</script>
