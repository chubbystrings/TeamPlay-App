<template>
<div>
<app-snack-bar v-if="successMsg"></app-snack-bar>
<div v-if="getFeedData.length > 0" :class="getMobileViewStatus ? '' : 'text-center'">
  {{ `${user.lastName.toLowerCase()}'s Timeline`}}
</div>
<div v-else class="text-center">
  No Activity
</div>
  <app-stories></app-stories>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
import routes from '../router/index';
import SnackBar from './successMsgComponent.vue';
import Stories from './storiesComponent.vue';

export default {
  data: () => ({
    dense: true,
    overlay: false,

  }),

  created() {
    this.$store.dispatch('backdropMsg', 'Loading');
    this.$store.dispatch('feed');
  },
  computed: {
    ...mapGetters(['getFeedData', 'errorMsg', 'successMsg', 'user', 'getMobileViewStatus']),
    serverSuccess() {
      if (this.successMsg) {
        return true;
      }
      return false;
    },
  },
  methods: {
    view(id, postType, authorId) {
      const postData = {
        id,
        postType,
      };
      this.$store.dispatch('author', authorId);
      routes.replace({ name: 'Post', params: { id: postData.id }, query: { post: postData.postType } });
    },
    likePost(id) {
      const data = {
        postId: id,
        userId: this.user.userId,
      };

      this.$store.dispatch('likeUnlikePost', data);
    },
  },
  components: {
    appSnackBar: SnackBar,
    appStories: Stories,
  },

};
</script>
<style scoped>
.cardWidth {
    width: 50rem;
}
.bottomBtn {
  position: absolute;
  bottom: 0.1rem
}
.overFlow {
  text-overflow: ellipsis;
}
</style>
