<template>
 <v-container
      >
        <v-row
          class="text-center"
        >
          <v-col
            cols="12"
          >
            <v-card class="elevation-12 mb-3"  style="width: 25rem;">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title class="black--text">Login form</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <p  class="ml-3 redColor" v-if="error && !password">{{serverError}}</p>
              <v-card-text>
                <form @submit.prevent="submit">
                  <v-text-field
                    v-model="email"
                    :error-messages="emailErrors"
                    label="E-mail"
                    name="email"
                    type="text"
                    required
                    @blur="$v.email.$touch()"
                  />

                  <v-text-field
                  v-model="password"
                  :error-messages="passwordErrors"
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    @blur="$v.email.$touch()"
                    :disabled="!$v.email.email || !email"
                  />
                  <v-spacer/>
                  <v-card-actions>
                  <v-btn
                  :disabled="$v.$anyError || !email || !password"
                  class="btnSubmit"
                  type="submit"
                  color="primary">Login</v-btn>
                  </v-card-actions>
                </form>
              </v-card-text>
            </v-card>
             <small>** only admins can add users **</small>
          </v-col>
        </v-row>
      </v-container>
</template>
<script>
import { validationMixin } from 'vuelidate';
import { required, minLength, email } from 'vuelidate/lib/validators';
import { mapState } from 'vuex';

export default {
  mixins: [validationMixin],
  validations: {
    password: { required, minLength: minLength(7) },
    email: { required, email },
  },

  data: () => ({
    password: '',
    email: '',
  }),

  computed: {
    ...mapState(['error']),
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      if (!this.$v.email.email) errors.push('Must be valid e-mail');
      if (!this.$v.email.required) errors.push('E-mail is required');
      return errors;
    },

    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      if (!this.$v.password.required) errors.push('password is required.');
      return errors;
    },

    serverError() {
      if (this.error === 401) return 'email or password incorrect';
      if (this.error === 400) return 'email or password is empty';
      if (this.error === 500) return 'unknown server error occurred';
      if (this.error === 408) return 'timeout slow connection, please try again ';
      return false;
    },

  },

  methods: {
    clear() {
      this.$v.$reset();
      this.name = '';
      this.email = '';
      this.message = '';
    },

    submit() {
      const formData = {
        email: this.email,
        password: this.password,
      };

      this.$store.dispatch('backdropMsg', 'signin');
      this.$store.dispatch('clearError');
      this.$store.dispatch('login', { email: formData.email, password: formData.password });
      this.password = '';
    },
  },
};
</script>
<style scoped>
.redColor {
  color: red;
}
.btnSubmit {
  position: absolute;
  right: 1rem;
  bottom: 0.4rem;
}
</style>
