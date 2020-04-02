<template>
  <div>
    <app-signup/>
  </div>
</template>

<script>
// @ is an alias to /src
import SignUp from '@/components/SignupComponent.vue';

export default {
  name: 'Signup',
  components: {
    appSignup: SignUp,
  },
};
</script>
