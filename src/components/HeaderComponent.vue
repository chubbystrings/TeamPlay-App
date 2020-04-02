<template>
     <v-app-bar
     :class="{removeShadow: $route.name === 'Home' && !isAuthenticated
     || $route.name === 'Signin' }"
      app
      clipped-left
      :color="getAdminTab ? 'orange' : 'primary'"
    >
      <v-app-bar-nav-icon v-if="isAuthenticated" @click.stop="drawerChange" />
      <v-toolbar-title>TeamPlay App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/"
      v-if="!getAdminTab"
        rounded text>{{isAuthenticated ? 'TIMELINE' : 'HOME'}}
    </v-btn>
     <v-btn v-if="isAuthenticated && !getAdminTab" to="/create-post"
        rounded text>Add Post
    </v-btn>
    <v-btn v-if="user.role === 'admin' && !getAdminTab" to="/signup"
        rounded text>Create User
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
    ...mapGetters(['darkMode', 'user', 'isAuthenticated', 'getDrawer', 'getAdminTab']),
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
