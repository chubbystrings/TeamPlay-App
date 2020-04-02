<template>
    <v-footer
    app
    :color="!mode ? 'primary' : ''"
    >
      <span>&copy; 2019</span>
    </v-footer>
</template>
<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      mode: 'darkMode',
    }),
  },
};
</script>
