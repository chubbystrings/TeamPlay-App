<template>
     <v-app-bar
     :class="{removeShadow: $route.name === 'Home' && !isAuthenticated
     || $route.name === 'Signin' }"
      app
      clipped-left
      :color="getAdminTab ? 'orange' : 'primary'"
    >
      <v-app-bar-nav-icon v-if="isAuthenticated" @click.stop="drawerChange" />
      <v-toolbar-title v-if="!getMobileViewStatus">TeamPlay App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/"
      v-if="!getAdminTab && !getMobileViewStatus"
        rounded text>{{isAuthenticated ? 'TIMELINE' : 'HOME'}}
    </v-btn>
    <v-btn icon to="/"
      v-if="!getAdminTab && getMobileViewStatus">
        <v-icon>{{ isAuthenticated ? 'mdi-timeline' : 'mdi-home'}}</v-icon>
    </v-btn>
     <v-btn v-if="isAuthenticated && !getAdminTab && !getMobileViewStatus" to="/create-post"
        rounded text>Add Post
    </v-btn>
    <v-btn icon to="/create-post"
      v-if="!getAdminTab && isAuthenticated && getMobileViewStatus">
        <v-icon>mdi-message-plus</v-icon>
    </v-btn>
    <v-btn v-if="user.role === 'admin' && !getAdminTab && !getMobileViewStatus" to="/signup"
        rounded text>Create User
    </v-btn>
    <v-btn icon to="/signup"
      v-if="user.role === 'admin' && !getAdminTab && getMobileViewStatus">
        <v-icon>mdi-account-plus</v-icon>
    </v-btn>
    <v-btn v-if="!isAuthenticated" to="/signin"
        rounded text>log In
    </v-btn>
    <v-btn v-else @click="logout"
        rounded text>log Out
    </v-btn>
    </v-app-bar>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {

    };
  },

  computed: {
    ...mapGetters(['darkMode', 'user', 'isAuthenticated', 'getDrawer', 'getAdminTab', 'getMobileViewStatus']),
  },

  methods: {
    drawerChange() {
      this.$store.dispatch('openDrawer');
    },
    logout() {
      this.$store.dispatch('logout');
      setTimeout(() => {
        this.$vuetify.theme.dark = false;
      }, 2000);
    },
  },
};
</script>
<style scoped>
.removeShadow {
    box-shadow: none;
}
</style>
