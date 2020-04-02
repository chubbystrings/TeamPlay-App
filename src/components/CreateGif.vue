<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="elevation-12"  style="width: 25rem; height: 22rem">
        <v-toolbar
          :color="getAdminTab ? 'orange' : 'primary'"
          dark
          flat
        >
      <v-toolbar-title>Post Gif</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <em class="redColor" v-if="serverError">{{serverError}}</em>
      <v-form @submit.prevent="submit"
        ref="form"
        v-model="valid"
        lazy-validation
        class="mx-2"
      >
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
        <v-spacer></v-spacer>
      <v-file-input
        @change="fileMethod"
        :rules="[rules]"
        accept="image/png, image/jpeg, image/gif"
        placeholder="Upload Photo"
        prepend-icon="mdi-camera"
        label="Image"
        show-size
      ></v-file-input>
      <v-spacer></v-spacer>
      <v-btn
      :disabled="!title || $v.$anyError || !imageGood "
     :color="getAdminTab ? 'orange' : 'primary'" class="btn--submit" type="submit">Submit</v-btn>
      </v-form>
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
  },
  data: () => ({
    valid: true,
    title: '',
    file: null,
    imageGood: true,
    // rules: [
    //   (value) => !value || value.size < 1000000 || 'Avatar size should be less than 1 MB!',
    // ],
  }),

  computed: {
    ...mapGetters(['errorMsg', 'successMsg', 'getAdminTab']),
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
    rules(value) {
      if (!value || value.size > 1000000) {
        this.imageGood = false;
        return 'Avatar size should be less than 1 MB!';
      }
      this.imageGood = true;
      return true;
    },
    fileMethod(file) {
      this.file = file;
    },
    submit() {
      this.$store.dispatch('backdropMsg', 'Loading');
      const data = new FormData();
      data.append('title', this.title);
      data.append('image', this.file);
      this.$store.dispatch('createGif', data);
    },
  },
};
</script>
<style scoped>
.btn--submit {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
}
.redColor{
  color: red;
}
</style>
