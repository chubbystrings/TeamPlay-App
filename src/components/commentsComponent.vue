<template>
  <div>
    <v-timeline dense>
      <transition-group enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut">
      <v-timeline-item
        v-for="(comment) in comments"
        :key="comment.comment"
        :color="`#${Math.floor(Math.random() * 16777215).toString(16)}`"
      >

        <v-card class="mr-3" elevation="10" >
          <v-card-title class="">
            {{comment.firstName | lowerCase }} {{ comment.lastName | lowerCase }}
            <small class="caption"  style="color: blue; margin-left: 0.5rem;">
              commented on {{ comment.createdOn | formatDate}}
            </small>
            </v-card-title>
          <v-card-text>
            {{comment.comment}}
          </v-card-text>
        </v-card>
      </v-timeline-item>
      </transition-group>
    </v-timeline>
  </div>
</template>
<script>
import moment from 'moment';

export default {
  props: ['comments'],
  data: () => ({
    reverse: true,
  }),

  filters: {
    formatDate(date) {
      return moment(date).format('MMMM Do YY, h:mm a');
    },
    lowerCase(value) {
      return value.toLowerCase();
    },
  },
};
</script>
<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css";
</style>
