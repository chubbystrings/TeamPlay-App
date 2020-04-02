<template>
    <div>Oops!! no page found</div>
</template>
<script>
export default {
  beforeCreate() {
    this.$store.dispatch('clearLink');
  },
};
</script>
<style scoped>

</style>
