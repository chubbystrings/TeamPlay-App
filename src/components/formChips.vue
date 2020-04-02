<template>
<span>
     <v-chip
      class="ma-2"
      color="red"
      text-color="white"
      close
      v-if="!checkForm || formError"
    >
    Incomplete
    </v-chip>
    <v-chip
    v-else
      class="ma-2"
      color="success"
      text-color="white"
    >
      <v-avatar>
        <v-icon>mdi-checkbox-marked-circle</v-icon>
      </v-avatar>
      Complete
    </v-chip>
    </span>
</template>
<script>
export default {
  props: ['checkForm', 'formError'],
};
</script>
