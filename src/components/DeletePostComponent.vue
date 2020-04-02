<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Delete Post?</v-card-title>
        <v-card-text>Are you sure you would like to delete this post?
            just so you know if you delete this, It's gone for life
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeDialog">NO</v-btn>
          <v-btn color="green darken-1" text @click="deletePost">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapState } from 'vuex';

export default {
  props: ['postId', 'postType'],
  data() {
    return {
      loader: false,
    };
  },

  methods: {
    deletePost() {
      this.$store.dispatch('backdropMsg', 'delete');
      const data = {
        id: this.postId,
        postType: this.postType,
      };
      this.$store.dispatch('deletePost', data);
    },
    closeDialog() {
      this.$store.dispatch('closeDialog');
    },
  },
  computed: {
    ...mapState(['dialog']),
  },
};
</script>
