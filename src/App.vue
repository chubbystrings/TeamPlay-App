
<template>
  <v-app id="inspire" :dark="goDark"
  :style="{backgroundColor: theme}">
    <app-loader v-if="link"></app-loader>

    <app-drawer></app-drawer>
    <app-header></app-header>

    <v-content>
      <v-container
        class=""
        fluid
      >
      <app-success></app-success>
      <app-error></app-error>
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="shrink">
             <transition name="fade" mode="out-in"
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut">
          <router-view></router-view>
          </transition>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

  <app-footer v-if="!isAuthenticated"></app-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from './components/HeaderComponent.vue';
import Footer from './components/FooterComponent.vue';
import Loader from './components/Backdrop.vue';
import SnackBarSuccess from './components/successMsgComponent.vue';
import SnackBarError from './components/errorMsgComponent.vue';
import NavigationDrawer from './components/NavigationDrawer.vue';


export default {
  props: {
    source: String,
  },
  data: () => ({
    goDark: true,
    themeColor: true,
    dark: false,
    mobView: false,
  }),
  components: {
    appHeader: Header,
    appFooter: Footer,
    appLoader: Loader,
    appSuccess: SnackBarSuccess,
    appError: SnackBarError,
    appDrawer: NavigationDrawer,
  },
  computed: {
    ...mapGetters(['getDrawer', 'isAuthenticated', 'user', 'link', 'successMsg', 'error', 'getDarkMode', 'getMobileViewStatus']),
    theme() {
      if (this.$route.name === 'Home' && !this.$vuetify.theme.dark && !this.isAuthenticated) return '#1976D2';
      if (this.$route.name === 'Signin' && !this.$vuetify.theme.dark && !this.isAuthenticated) return '#1976D2';
      if (this.isAuthenticated && !this.$vuetify.theme.dark) return '#FAFAFA';
      return '';
    },
  },

  methods: {
    setTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      // const data = {
      //   mode: this.$vuetify.theme.dark,
      // };
      // this.$store.dispatch('darkMode', data);
    },
    logout() {
      this.$store.dispatch('logout');
    },
    myEventHandler(e) {
      if (e.target.innerWidth <= 600) {
        this.$store.dispatch('mobileView', true);
      } else {
        this.$store.dispatch('mobileView', false);
      }
    },
  },


  created() {
    window.addEventListener('resize', this.myEventHandler);
    this.$store.dispatch('tryAutoLogin');
  },


  destroyed() {
    window.removeEventListener('resize', this.myEventHandler);
  },

};
</script>
<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css";
.backG {
  background-color: #c2dfeb;
}
</style>
