<template>
    <v-container>
      <v-row align="center">
        <v-col cols="12" style="border: 1px solid white; width: 100vw;">
          <div class="text-center">
                <v-btn
                width="100"
                elevation="15"
                @click="users = true" :color="usersColor" >USERS</v-btn>
                <v-btn
                width="100"
                elevation="15"
                 @click="users= false" :color="postsColor"
                 >
                 POSTS
                </v-btn>
          </div>
        </v-col>
            <v-col cols="12" style="" class="text-center">
              <transition mode="out-in"
              enter-active-class="animated zoomIn"
              leave-active-class="animated zoomOut"
              >
                <app-users v-if="users"></app-users>
                <app-posts v-else></app-posts>
              </transition>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex';
import Users from '../components/UsersTableComponent.vue';
import Posts from '../components/PostsTableComponent.vue';


export default {
  data: () => ({
    users: true,
  }),
  computed: {
    ...mapGetters(['getAdminTab']),
    usersColor() {
      if (this.getAdminTab && this.users) {
        return 'orange';
      }
      if (!this.getAdminTab && this.users) {
        return 'primary';
      }

      return '';
    },

    postsColor() {
      if (this.getAdminTab && !this.users) {
        return 'orange';
      }
      if (!this.getAdminTab && !this.users) {
        return 'primary';
      }

      return '';
    },
  },
  components: {
    appUsers: Users,
    appPosts: Posts,
  },
};
</script>
<style scoped>
.activeBtn {
  background-color: blue;
}
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css";
</style>
