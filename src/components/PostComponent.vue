<template>
<v-container fluid>
  <v-row>
    <v-col cols="12">
      <app-delete v-if="openDeleteDialog" :postId="id" :postType="postType"></app-delete>
      <app-edit
      v-if="openEditDialog"
      :editTitle="title"
      :article="article"
      :articleId="id"
      @cancel="openEditDialog = false">
      </app-edit>
    <v-card outlined style="width: 66vw;" v-if="showCard">
       <v-list-item>
      <v-list-item-avatar color="grey"></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title
        class="headline">{{title}}
        <small v-if="updatedOn" style="color: blue;">edited</small>
        </v-list-item-title>
        <v-list-item-subtitle>
          posted by
          {{user.userId == postAuthor ? 'you' : authorName | lowerCase}}
           on {{createdOn | formatDate}}
          </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-img
    v-if="imageUrl"
      :src="imageUrl"
      max-height="200"
      max-width="250"
      class="mx-auto"
    ></v-img>

    <v-card-text v-else>
      {{article}}
    </v-card-text>
     <v-card-actions>
      <v-badge
      color="primary"
      :content="commentData.length > 0 ? commentData.length : '0'"
      >
        comments
      </v-badge>
      <v-btn @click="commentOpen = !commentOpen"
      class="ma-5"
      small fab >
        <v-icon color="primary">mdi-pencil</v-icon>
      </v-btn>
        <v-btn icon @click="likePost">
          <v-badge
      color="primary"
      :content="likes ? likes : '0'"
      >
          <v-icon
          :color="userLiked? 'primary' : ''"
          >mdi-heart</v-icon>
        </v-badge>
        </v-btn>
      <v-btn text color="primary"
      v-if="postAuthor == user.userId && postType === 'article'"
      @click="editPost"
      class="caption"
      >
        Edit
      </v-btn>
      <v-btn text color="primary"
      v-if="postAuthor == user.userId"
      @click="deletePost"
      class="caption"
      >
        delete
      </v-btn>
       <transition
     enter-active-class="animated bounce"
      leave-active-class="animated fadeOut">
      <v-textarea
      v-if="commentOpen"
            label="write"
            class="ml-1"
            v-model="comment"
            rows="1"
            auto-grow
            clearable
            counter="250"
          >
      </v-textarea>
       </transition>
        <transition
     enter-active-class="animated bounce"
      leave-active-class="animated fadeOut">
      <v-btn
      v-if="commentOpen"
          color="blue darken-1" text
          :disabled="!comment || comment.length > 250" @click="submit" x-large>reply
        </v-btn>
        </transition>
     </v-card-actions>
      <div v-if="commentOpen">
       <v-row >
         <v-col cols="6">
        </v-col>
        <v-col cols="6">
        </v-col>
       </v-row>
      </div>
     <app-comments :comments="commentData"></app-comments>
    </v-card>
  </v-col>
</v-row>
</v-container>
</template>
<script>
import { mapState } from 'vuex';
import moment from 'moment';
import axios from '../auth-user';
import Comments from './commentsComponent.vue';
import DeleteDialog from './DeletePostComponent.vue';
import EditDialog from './EditPostComponent.vue';

export default {
  //
  data: () => ({
    showCard: false,
    id: '',
    postType: '',
    postId: null,
    comment: '',
    title: '',
    article: '',
    imageUrl: '',
    comments: [],
    posts: false,
    postAuthor: 0,
    likes: 0,
    userLiked: false,
    authorName: '',
    createdOn: '',
    updatedOn: '',
    commentOpen: false,
    openDeleteDialog: false,
    openEditDialog: false,
  }),
  computed: {
    ...mapState(['postData', 'user', 'link', 'author', 'commentData', 'dialog', 'postDetails']),

  },

  beforeCreate() {
    if (!this.$route.params.id || !this.$route.query.post) {
      this.$router.replace({ name: 'Home' });
    }
  },

  created() {
    axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;
    if (this.$route.query.post === 'article') {
      this.$store.dispatch('backdropMsg', 'Loading');
      axios.get(`/articles/${this.$route.params.id}/comment`)
        .then((res) => {
          this.postAuthor = res.data.data.postAuthorId;
          this.title = res.data.data.title;
          this.article = res.data.data.article;
          this.authorName = `${res.data.data.authorFirstName} ${res.data.data.authorLastName}`;
          this.createdOn = res.data.data.createdOn;
          this.id = res.data.data.id;
          this.postType = res.data.data.postType;
          this.postId = res.data.data.postId;
          this.likes = res.data.data.likesNumber;
          this.userLiked = res.data.data.currentUserLiked;
          this.updatedOn = res.data.data.updatedOn;
          this.showCard = true;
          this.$store.dispatch('createComment', res.data.data.comments);
          this.posts = true;
          this.$store.dispatch('clearLink');
        })
        .catch((error) => {
          this.$store.commit('ERROR_MSG', error);
          this.$router.replace({ name: 'Home' });
        });
    }
    if (this.$route.query.post === 'gif') {
      this.$store.dispatch('backdropMsg', 'Loading');
      axios.get(`/gifs/${this.$route.params.id}/comment`)
        .then((res) => {
          this.postAuthor = res.data.data.postAuthorId;
          this.id = res.data.data.id;
          this.postType = res.data.data.postType;
          this.postId = res.data.data.postId;
          this.likes = res.data.data.likesNumber;
          this.userLiked = res.data.data.currentUserLiked;
          this.title = res.data.data.title;
          this.imageUrl = res.data.data.imageUrl;
          this.createdOn = res.data.data.createdOn;
          this.authorName = `${res.data.data.authorFirstName} ${res.data.data.authorLastName}`;
          this.showCard = true;
          this.$store.dispatch('createComment', res.data.data.comments);
          this.posts = true;
          this.$store.dispatch('clearLink');
        })
        .catch((error) => {
          this.$store.commit('ERROR_MSG', error);
          this.$router.replace({ name: 'Home' });
        });
    }
  },

  components: {
    appComments: Comments,
    appDelete: DeleteDialog,
    appEdit: EditDialog,
  },
  filters: {
    formatDate(date) {
      return moment(date).format('MMMM Do YY, h:mm:ss a');
    },
    lowerCase(value) {
      return value.toLowerCase();
    },
  },
  methods: {
    submit() {
      const data = {
        id: this.id,
        postType: this.postType,
        comment: this.comment,

      };
      this.$store.dispatch('addComment', data);
      this.comment = '';
    },

    likePost() {
      this.userLiked = !this.userLiked;
      const data = {
        postId: Number(this.postId),
      };
      if (this.userLiked) {
        this.$store.dispatch('likePost', data);
        this.likes += 1;
      } else {
        this.$store.dispatch('unlikePost', data);
        this.likes -= 1;
      }
    },

    deletePost() {
      this.openDeleteDialog = true;
      this.$store.dispatch('openDialog');
    },
    editPost() {
      this.openEditDialog = true;
      this.$store.dispatch('openEditDialog');
    },

    clear() {
      this.id = '';
      this.postType = '';
      this.comment = '';
      this.title = '';
      this.article = '';
      this.imageUrl = '';
      this.comments = [];
      this.posts = false;
      this.postAuthor = 0;
      this.authorName = '';
      this.createdOn = '';
      this.showCard = false;
    },
  },

  destroyed() {
    this.clear();
  },
};
</script>
<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css";
</style>
