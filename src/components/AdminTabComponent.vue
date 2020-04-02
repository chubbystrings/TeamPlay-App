<template>
  <v-card
  width="825"
  >
    <v-toolbar
      color="orange"
      dark
      flat
      prominent
      height="40"
    >

     <v-spacer></v-spacer>

      <template v-slot:extension>
        <v-tabs
        fixed-tabs
          v-model="tab"
          align-with-title
          centered
        >
          <v-tabs-slider color="white"></v-tabs-slider>
          <v-tab v-for="item in items" :key="item.header">
            {{ item.header}}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item.header"
      >
        <v-card flat>
          <v-card-text>{{item.text}}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      tab: null,
      items: [
        {
          header: 'USERS',
          text: 'this is users',
        }, {
          header: 'POSTS',
          text: 'this is POST',
        }, {
          header: 'SEARCH',
          text: 'this is users',
        },
      ],
    };
  },
};
</script>
<style scoped>


</style>
