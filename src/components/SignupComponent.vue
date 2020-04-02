
<template>
  <v-container>
    <v-row
    align="center"
    justify="center"
    >
      <v-col
      cols="12"
      >
       <v-card class="elevation-12"  style="width: 25rem;">
        <v-toolbar
          :color="getAdminTab ? 'orange' : 'primary'"
          dark
          flat
        >
          <v-toolbar-title>Create User</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-card-text>
          <em class="redColor" v-if="serverError">{{serverError}}</em>
          <v-form>
            <v-select
            v-model="siteRoleSelect"
          :items="siteRole"
          :error-messages="siteRoleSelectErrors"
          label="site role"
          required
          @change="$v.siteRoleSelect.$touch()"
          @blur="$v.siteRoleSelect.$touch()"
          ></v-select>
        <v-text-field
          v-model="firstName"
          :error-messages="fnameErrors"
          label="Firstname"
          required
          @input="$v.firstName.$touch()"
          @blur="$v.firstName.$touch()"
        ></v-text-field>
         <v-text-field
          v-model="lastName"
          :error-messages="lnameErrors"
          label="Lastname"
          required
          @input="$v.lastName.$touch()"
          @blur="$v.lastName.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
          <v-text-field
          type="password"
          v-model="password"
          :error-messages="passwordErrors"
          label="Password"
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        ></v-text-field>
        <v-select
          v-model="deptSelect"
          :items="department"
          :error-messages="deptSelectErrors"
          label="Department"
          required
          @change="$v.deptSelect.$touch(), selectJobRole($event)"
          @blur="$v.deptSelect.$touch()"
        ></v-select>
        <v-select
          v-model="roleSelect"
          :items="jobRole"
          :error-messages="roleSelectErrors"
          label="Job Role"
          required
          @change="$v.roleSelect.$touch()"
          @blur="$v.roleSelect.$touch()"
        ></v-select>
         <v-select
          v-model="genderSelect"
          :items="gender"
          :error-messages="genderSelectErrors"
          label="Gender"
          required
          @change="$v.genderSelect.$touch()"
          @blur="$v.genderSelect.$touch()"
        ></v-select>
        <v-text-field
          v-model="address"
          :error-messages="addressErrors"
          label="Address"
          required
          @input="$v.address.$touch()"
          @blur="$v.address.$touch()"
        ></v-text-field>
        <app-chips :checkForm="checkForm" :formError="$v.$anyError"></app-chips>
        <v-btn
        class="submitBtn"
        :disabled="$v.$anyError || !checkForm"
        color="primary"
        @click.enter="submit"
        >submit</v-btn>
      </v-form>
  </v-card-text>
    </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable no-unused-expressions */
import { mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import {
  required, minLength, maxLength, email,
} from 'vuelidate/lib/validators';
import FormChips from './formChips.vue';

export default {
  mixins: [validationMixin],

  validations: {
    siteRoleSelect: { required },
    firstName: { required, maxLength: maxLength(10) },
    lastName: { required, maxLength: maxLength(10) },
    email: { required, email },
    password: { required, minLength: minLength(7) },
    deptSelect: { required },
    roleSelect: { required },
    genderSelect: { required },
    address: { required, maxLength: maxLength(200) },
  },

  data: () => ({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    deptSelect: null,
    genderSelect: null,
    roleSelect: null,
    siteRoleSelect: null,
    department: [
      'HR',
      'Administrative',
      'Factory',
    ],
    gender: [
      'male',
      'female',
    ],
    address: '',
    jobRole: [],
    siteRole: [
      'admin',
      'employee',
    ],
  }),

  computed: {
    ...mapGetters(['errorMsg', 'successMsg', 'getAdminTab']),
    serverSuccess() {
      if (this.successMsg) {
        return true;
      }
      return false;
    },
    serverError() {
      if (this.errorMsg === 401) return 'Not authorized';
      if (this.errorMsg === 400) return 'Invalid value entered';
      if (this.errorMsg === 409) return 'This email already exist in our database';
      if (this.errorMsg === 500) return 'unknown server error occurred';
      if (this.errorMsg === 501) return 'No internet connection or server error';
      return false;
    },
    deptSelectErrors() {
      const errors = [];
      // eslint-disable-next-line max-len
      if (!this.$v.deptSelect.$dirty) return errors;
      if (!this.$v.deptSelect.required) errors.push('department is required');
      return errors;
    },

    roleSelectErrors() {
      const errors = [];
      if (!this.$v.roleSelect.$dirty) return errors;
      if (!this.$v.roleSelect.required) errors.push('Role is required');
      return errors;
    },

    genderSelectErrors() {
      const errors = [];
      if (!this.$v.genderSelect.$dirty) return errors;
      if (!this.$v.genderSelect.required) errors.push('Gender is required');
      return errors;
    },
    fnameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      if (!this.$v.firstName.maxLength) errors.push('Name must be at most 10 characters long');
      if (!this.$v.firstName.required) errors.push('Name is required.');
      return errors;
    },
    lnameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      if (!this.$v.lastName.maxLength) errors.push('Name must be at most 10 characters long');
      if (!this.$v.lastName.required) errors.push('Name is required.');
      return errors;
    },
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
      if (!this.$v.password.minLength) errors.push('Must be more than & characters');
      if (!this.$v.password.required) errors.push('E-mail is required');
      return errors;
    },
    addressErrors() {
      const errors = [];
      if (!this.$v.address.$dirty) return errors;
      if (!this.$v.address.required) errors.push('Address is required');
      return errors;
    },
    siteRoleSelectErrors() {
      const errors = [];
      if (!this.$v.siteRoleSelect.$dirty) return errors;
      if (!this.$v.siteRoleSelect.required) errors.push('site role is required');
      return errors;
    },
    checkForm() {
      // eslint-disable-next-line max-len
      if (!this.siteRoleSelect || !this.firstName || !this.lastName || !this.email || !this.password || !this.deptSelect || !this.roleSelect || !this.genderSelect || !this.address) return false;
      return true;
    },
  },

  methods: {
    submit() {
      if (this.checkForm) {
        const userData = {};
        userData.roleId = this.roleSelect === 'admin' ? 1 : 2;
        userData.firstName = this.firstName;
        userData.lastName = this.lastName;
        userData.email = this.email;
        userData.password = this.password;
        userData.department = this.deptSelect;
        userData.jobRole = this.roleSelect;
        userData.gender = this.genderSelect;
        userData.address = this.address;
        this.$store.dispatch('backdropMsg', 'signup');
        this.$store.dispatch('clearError');
        this.$store.dispatch('createUser', userData);
        if (this.successMsg) {
          this.clear();
        }
      }
    },
    clear() {
      this.$v.$reset();
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.password = '';
      this.deptSelect = null;
      this.genderSelect = null;
      this.roleSelect = null;
      this.siteRoleSelect = null;
      this.address = '';
    },
    selectJobRole(event) {
      const role = {
        HR: ['HR office', 'HR manager'],
        Administrative: ['Admin Officer', 'Admin Manager'],
        Factory: ['officer 1', 'officer 2'],
      };
      this.jobRole = role[event];
    },
  },
  components: {
    appChips: FormChips,
  },
};
</script>
<style scoped>
.redColor {
  color: red;
}
.submitBtn {
  position: absolute;
  right: 1rem;
}
</style>
