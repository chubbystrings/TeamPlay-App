<template>
  <div>
    <app-Home/>
  </div>
</template>

<script>
// @ is an alias to /src
import Home from '@/components/HomeComponent.vue';

export default {
  name: 'Home',
  components: {
    appHome: Home,
  },
};
</script>
