<template>
    <v-container>
      <v-row align="center">
        <v-col cols="12">
          <div class="text-center">
            <div>
                <v-btn
                width="100"
                elevation="15"
                @click="gif = false" :color="articleColor" >Article</v-btn>
                <v-btn
                width="100"
                elevation="15"
                 @click="gif= true" :color="gifColor" >Gif</v-btn>
            </div>
          </div>
        </v-col>
            <v-col>
              <transition mode="out-in"
              enter-active-class="animated zoomIn"
              leave-active-class="animated zoomOut"
              >
                <app-create-article v-if="!gif"></app-create-article>
                <app-create-gif v-else></app-create-gif>
              </transition>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex';
import CreateGif from '../components/CreateGif.vue';
import CreateArticle from '../components/CreateArticle.vue';


export default {
  data: () => ({
    gif: false,
  }),
  computed: {
    ...mapGetters(['getAdminTab']),
    articleColor() {
      if (this.getAdminTab && !this.gif) {
        return 'orange';
      }
      if (!this.getAdminTab && !this.gif) {
        return 'primary';
      }

      return '';
    },

    gifColor() {
      if (this.getAdminTab && this.gif) {
        return 'orange';
      }
      if (!this.getAdminTab && this.gif) {
        return 'primary';
      }

      return '';
    },
  },
  components: {
    appCreateArticle: CreateArticle,
    appCreateGif: CreateGif,
  },
};
</script>
<style scoped>
.btnChange {
  position: absolute;
  top: 1rem;
  margin: 0 auto;
}
.activeBtn {
  background-color: blue;
}
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css";
</style>
