<template>
    <v-timeline
    :dense="getMobileViewStatus ? true : false"
    >
    <v-timeline-item
      large
      v-for="(n) in getFeedData"
      :key="n.postId"
    >
     <template v-slot:icon>
        <v-avatar :color="`#${Math.floor(Math.random() * 16777215).toString(16)}`">
        </v-avatar>
      </template>
      <template v-slot:opposite>
        <span>
          {{n.firstName.toLowerCase() }} {{n.lastName.toLowerCase() }}
          {{n.roleId === 1 ? '(admin)' : ''}}
        </span>
      </template>
      <v-hover>
    <template>
      <v-card
    width="405"
    height="355"
    class="mx-auto"
    elevation="15"
    outlined
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">{{n.title}}</v-list-item-title>
        <v-list-item-subtitle>
          by {{n.firstName.toLowerCase() }} {{n.lastName.toLowerCase()}}
          </v-list-item-subtitle>
          <span>{{n.postType }} post</span>
      </v-list-item-content>
    </v-list-item>
    <v-img
    v-if="n.postType === 'gif'"
      :src="n['article/url']"
      style="height: 200px; width: 200px"
      class="mx-auto"
    ></v-img>

    <v-card-text
    v-if="n.postType === 'article'">
      {{n['article/url'].length > articleLength ?
      n['article/url'].split(" ").splice(0, articleLength,).join(" ").concat('...')
      : n['article/url']}}
    </v-card-text>

    <v-card-actions class="bottomBtn">
      <v-btn
      v-if="!getMobileViewStatus"
        text
        color="primary"
        @click="view(n.id, n.postType, n.authorId)"
      >
        {{n.postType === 'article' ? 'read' : 'view'}}
      </v-btn>
      <v-btn
      icon
      v-if="getMobileViewStatus"
        text
        color="primary"
        @click="view(n.id, n.postType, n.authorId)"
      >
        <v-icon>mdi-eye</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-badge
      v-if="!getMobileViewStatus"
      color="primary"
      :content="n.likes.length || '0'"
      class="mr-4"
      >
        Likes
      </v-badge>
      <v-badge v-if="getMobileViewStatus"
      color="primary"
      :content="n.likes.length || '0'"
      class="mr-4"
      >
        <v-icon>mdi-cards-heart</v-icon>
      </v-badge>
      <v-badge
      v-if="!getMobileViewStatus"
      color="primary"
      :content="n.commentsNumber"
      >
        comments
      </v-badge>
       <v-badge
       v-if="getMobileViewStatus"
      color="primary"
      :content="n.commentsNumber"
      >
        <v-icon>mdi-comment</v-icon>
      </v-badge>
    </v-card-actions>
  </v-card>
    </template>
  </v-hover>
    </v-timeline-item>
  </v-timeline>
</template>
<script>
import { mapGetters } from 'vuex';
import routes from '../router/index';


export default {
  props: ['n'],
  data: () => ({
    reverse: true,
    dense: true,
    overlay: false,

  }),
  computed: {
    ...mapGetters(['user', 'getFeedData', 'getMobileViewStatus']),
    articleLength() {
      if (this.getMobileViewStatus) {
        return 25;
      }
      return 30;
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
