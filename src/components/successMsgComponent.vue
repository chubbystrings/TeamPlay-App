<template>
  <div class="text-center successBar">
    <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    >
    <v-snackbar
    v-if="successMsg"
      v-model="snackbar"
      :multi-line="multiLine"
      color="success"
      :timeout="timeout"
      top
    >
      {{ successMsg }}
      <v-btn
        color="white"
        text
        @click="closeBar"
      >
        Close
      </v-btn>
    </v-snackbar>
    </transition>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    multiLine: true,
    snackbar: true,
    timeout: 0,
  }),

  computed: {
    ...mapGetters(['successMsg']),
  },

  methods: {
    closeBar() {
      this.$store.dispatch('closeSuccessMsg');
    },
  },
};
</script>
<style scoped>
.successBar {
  z-index: 1000;
}
</style>
