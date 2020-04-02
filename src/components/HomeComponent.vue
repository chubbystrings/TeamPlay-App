<template>
  <v-container>
    <v-row v-if="!isAuthenticated" class="text-center">
      <v-col cols="12">
       <h1 class="display-3 mb-2">TeamPlay<sup>&copy;</sup></h1>
        <em>All work no play makes jack a dullard....</em>
      </v-col>
      <v-col cols="12">
       <p class="headline">A social app for the work-place</p>
       <p>Remain Annonymous while you have fun, share funny memes,
         articles, say your mind all in your work-place</p>
      </v-col>
      <v-btn block>Join Us Now</v-btn>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
         <transition mode="out-in"
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <app-timeline></app-timeline>
         </transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import Timeline from './Timeline.vue';

export default {
  name: 'Home',

  data: () => ({
    //

  }),
  computed: {
    ...mapGetters(['isAuthenticated', 'getAdminTab']),
  },
  components: {
    appTimeline: Timeline,
  },
};
</script>
<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css";

</style>
