<template>
  <div>
    <app-signin/>
  </div>
</template>

<script>
// @ is an alias to /src
import Signin from '@/components/SigninComponent.vue';

export default {
  name: 'Home',
  components: {
    appSignin: Signin,
  },
};
</script>
