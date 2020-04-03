<template>
<div>
   <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">{{ action }} user(s)?</v-card-title>
        <v-card-text>Are you sure you would like to {{ action }} user(s)?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="noAction">NO</v-btn>
          <v-btn color="green darken-1" text @click="doAction">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  <v-card>
    <v-card-title>
      USERS
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
     <v-card-actions>
       <v-col cols="12">
          <v-btn
          class="mr-1"
          @click="deleteBtn"
          :color="getDarkMode ? 'orange' : 'primary'"
          :disabled="selected.length === 0 || selected.length > 1"
          >
          Delete
          </v-btn>
          <v-btn
          class="mr-1"
          @click="suspendBtn"
          :color="getDarkMode ? 'orange' : 'primary'"
          :disabled="selected.length === 0 || selected.length > 1"
          >
          {{ reactivate ? 'suspend' : 'reactivate' }}
          </v-btn>
          <v-btn
          class="mt-2"
          @click="deleteMany"
          :color="getDarkMode ? 'orange' : 'primary'"
          :disabled="selected.length <= 1 || selected.length === 0"
          >
          Delete Users ({{ selected.length > 1 ? selected.length : 0  }})
          </v-btn>
       </v-col>
      </v-card-actions>
    <v-data-table
        v-model="selected"
        :single-select="singleSelect"
        show-select
        item-key="email"
        :headers="headers"
        :items="users"
        :search="search"
    >
     <template v-slot:top>
      <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
    </template>
    </v-data-table>
  </v-card>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
import axios from '../auth-user';

export default {
  data() {
    return {
      suspendOrActivate: null,
      action: '',
      dialog: false,
      search: '',
      singleSelect: false,
      selected: [],
      headers: [
        { text: 'ID', value: 'userid' },
        {
          text: 'FirstName',
          value: 'firstname',
        },
        {
          text: 'LastName',
          value: 'lastname',
        },
        { text: 'Email', value: 'email' },
        { text: 'Role ID', value: 'roleid' },
        { text: 'Created', value: 'createdon' },
        { text: 'Active', value: 'isactive' },
        { text: 'Role', value: 'role' },
      ],
      users: [],
    };
  },

  computed: {
    ...mapGetters(['getDarkMode', 'getMobileViewStatus']),
    reactivate() {
      const row = this.selected[0];
      if (!row) {
        return true;
      }
      if (row && row.isactive === true) {
        return true;
      }
      return false;
    },
  },

  methods: {
    deleteBtn() {
      this.action = 'Delete';
      this.dialog = true;
    },

    suspendBtn() {
      const userIndex = this.users.indexOf(this.selected[0]);
      this.action = this.users[userIndex].isactive ? 'Suspend' : 'Reactivate';
      this.dialog = true;
    },

    deleteMany() {
      this.action = 'Delete Selected';
      this.dialog = true;
    },

    doAction() {
      this.dialog = false;
      if (this.action === 'Suspend' || this.action === 'Reactivate') {
        const userIndex = this.users.indexOf(this.selected[0]);
        this.users[userIndex].isactive = !this.users[userIndex].isactive;
        const userId = this.users[userIndex].userid;
        const data = {
          userId,
          active: this.users[userIndex].isactive,
        };
        this.$store.dispatch('isActive', data);
        this.selected = [];
      }

      if (this.action === 'Delete') {
        const userIndex = this.users.indexOf(this.selected[0]);
        const userId = this.users[userIndex].userid;
        const data = {
          userId,
        };
        this.$store.dispatch('deleteUser', data);
        this.users.splice(userIndex, 1);
      }

      if (this.action === 'Delete Selected') {
        const ids = [];
        this.selected.forEach((select) => {
          ids.push(select.userid);
        });

        const data = {
          ids: ids.join(','),
        };
        this.$store.dispatch('deleteMany', data);
        if (!this.$store.state.error) {
          this.selected.forEach((select) => {
            this.users.splice(this.users.indexOf(select), 1);
          });
        }
      }
    },

    noAction() {
      this.dialog = false;
      this.selected = [];
    },
  },

  created() {
    this.$store.commit('OPEN_ADMIN_TAB');
    this.$store.dispatch('backdropMsg', 'Loading');
    const url = '/auth/users';
    const config = {
      headers: {
        Authorization: `Bearer ${this.$store.state.user.token}`,
      },
    };
    axios.get(url, config)
      .then((res) => {
        res.data.data.forEach((data) => {
          this.users.push({
            userid: data.userid,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            roleid: data.roleid,
            createdon: data.createdon,
            isactive: data.isactive,
            role: data.role,
          });
        });
        this.$store.dispatch('clearLink');
      })
      .catch((error) => {
        this.$store.commit('ERROR_MSG', error);
        this.$store.dispatch('clearError');
      });
  },
};
</script>
