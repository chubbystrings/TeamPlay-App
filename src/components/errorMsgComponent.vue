<template>
  <div class="text-center successBar">
    <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    >
    <v-snackbar
    v-if="error"
      v-model="snackbar"
      :multi-line="multiLine"
      color="#E53935"
      :timeout="timeout"
      top
    >
      {{ `An error has occurred! ${error}` }}
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
    ...mapGetters(['error']),
  },

  methods: {
    closeBar() {
      this.$store.dispatch('clearError');
    },
  },
};
</script>
<style scoped>
.redColor {
    color: red;
}
.successBar {
  z-index: 1000;
}
</style>
