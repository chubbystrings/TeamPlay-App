<template>
  <v-row justify="center">
    <v-dialog v-model="editDialog" persistent max-width="600px">

      <v-card>
        <v-card-title>
          <span class="headline text-center">Edit Article</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                <v-col cols="12">
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
                </v-col>
                <v-col>
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
                </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel">Close</v-btn>
          <v-btn color="blue darken-1"
          :disabled="$v.$anyError || !content || !title"
          text @click="submit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
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
  props: ['editTitle', 'article', 'articleId'],
  data: () => ({
    title: '',
    content: '',
  }),

  computed: {
    ...mapGetters(['errorMsg', 'successMsg', 'editDialog']),
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
      const data = {
        title: this.title,
        content: this.content,
        id: this.articleId,
      };
      this.$store.dispatch('backdropMsg', 'edit');
      this.$store.dispatch('editArticle', data);
    },

    cancel() {
      this.$v.$reset();
      this.$store.dispatch('closeEditDialog');
      this.$emit('cancel');
    },
  },
  created() {
    this.content = this.article;
    this.title = this.editTitle;
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
