<template>
  <v-container>
    <v-row>
      <v-col cols="12">
         <v-card class="elevation-12"  style="width: 25rem; height: 22rem;">
          <v-toolbar
            :color="getAdminTab ? 'orange' : 'primary'"
            dark
            flat
          >
            <v-toolbar-title>Post Article</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <em class="redColor" v-if="serverError">{{serverError}}</em>
      <v-text-field
      v-model="title"
      :counter="25"
      :error-messages="titleRules"
      label="Title"
      prepend-icon="mdi-pencil"
      required
      @change="$v.title.$touch()"
      @blur="$v.title.$touch()"
    ></v-text-field>
        <v-textarea
        v-model="content"
          :error-messages="contentRules"
          class="mx-2"
          label="Article"
          rows="4"
          clearable
          prepend-icon="mdi-comment-text-outline"
          :counter="500"
          @change="$v.content.$touch()"
          @blur="$v.content.$touch()"
        ></v-textarea>
        <v-btn
        :disabled="!content || !title || $v.$anyError"
        class="btn---submit"
        :color="getAdminTab ? 'orange' : 'primary'"
        @click.enter="submit">Submit</v-btn>
        </v-card-text>
        </v-card>
      </v-col>
     </v-row>
   </v-container>
</template>
<script>
import { validationMixin } from 'vuelidate';
import {
  required, maxLength,
} from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';

export default {
  mixins: [validationMixin],
  validations: {
    title: { required, maxLength: maxLength(25) },
    content: { required, maxLength: maxLength(500) },
  },
  data: () => ({
    content: '',
    title: '',
  }),

  computed: {
    ...mapGetters(['errorMsg', 'successMsg', 'getAdminTab']),
    contentRules() {
      const errors = [];
      if (!this.$v.content.$dirty) return errors;
      if (!this.$v.content.maxLength) errors.push('Article must be at most 500 characters long');
      if (!this.$v.content.required) errors.push('Article is required.');
      return errors;
    },
    titleRules() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      if (!this.$v.title.maxLength) errors.push('Title must be at most 10 characters long');
      if (!this.$v.title.required) errors.push('Title is required.');
      return errors;
    },
    serverError() {
      if (this.errorMsg === 401) return 'Not authorized';
      if (this.errorMsg === 400) return 'Invalid value entered';
      if (this.errorMsg === 500) return 'unknown server error occurred';
      if (this.errorMsg === 501) return 'No internet connection or server error';
      return false;
    },
  },
  methods: {
    submit() {
      const articleData = {
        title: this.title,
        content: this.content,
      };
      this.$store.dispatch('backdropMsg', 'Loading');
      this.$store.dispatch('createArticle', articleData);
    },
  },
};
</script>
<style scoped>
.btn---submit {
  position: absolute;
  right: 1rem;
  bottom: 0.4rem;
}
.redColor {
  color: red;
}
</style>
