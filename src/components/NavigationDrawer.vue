 <template>
 <v-navigation-drawer
      v-if="isAuthenticated"
      :value="getDrawer"
      app
      clipped
    >
      <v-list dense>
          <v-list-item two-line>
            <v-list-item-avatar>
              <img v-if="isAuthenticated" src="https://randomuser.me/api/portraits/men/81.jpg">
            </v-list-item-avatar>

            <v-list-item-content v-if="isAuthenticated">
              <v-list-item-title>{{user.firstName}}</v-list-item-title>
              <v-list-item-subtitle>{{user.lastName}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content v-if="!isAuthenticated">
              <v-list-item-title>Please Log In</v-list-item-title>
              <v-list-item-subtitle></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-chip
            v-if="isAuthenticated"
            class="ma-2"
            :color="user.role === 'admin' ? 'orange' : 'primary' "
            text-color="white"
            >
            {{user.role}}
            <v-icon right>mdi-star</v-icon>
          </v-chip>
          <v-divider></v-divider>
        <v-list-item link v-if="isAdmin && !getAdminTab">
          <v-list-item-action>
            <v-icon :color="colorChange">mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-if="isAdmin" text @click="openAdminTab">
                 ADMIN DASHBORAD
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link v-if="isAdmin && getAdminTab">
          <v-list-item-action>
            <v-icon :color="colorChange">mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content v-if="isAdmin">
            <v-list-item-title text @click="closeAdminTab">
                BACK TO HOME
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
            <v-list-item link v-if="isAuthenticated">
          <v-list-item-action>
            <v-icon :color="colorChange">mdi-switch</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title @click="darkModeDialog = true">
              DARK MODE SWITCH
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
        <template v-slot:append>
        <div v-if="isAuthenticated" class="pa-2">
          <v-btn :color="colorChange ? colorChange : 'primary'" @click="logout" block>Logout</v-btn>
        </div>
        <div v-else class="pa-2">
          <v-btn :color="colorChange ? colorChange : 'primary'" block>Log In</v-btn>
        </div>
    <v-row justify="center" v-if="darkModeDialog">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card v-if="!switchChange">
        <v-card-title class="headline">
            Turn Dark Mode {{ getDarkMode ? 'Off' : 'On'}} ?
            </v-card-title>
        <v-card-text>
            Just tap swicth and experience change
            <v-switch :color="colorChange" v-model="dark" @change="switchChange = true" ></v-switch>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text
          @click="darkModeDialog = false, switchChange = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
       <v-card v-else>
        <v-card-title class="headline">
            NICE!! <span>&#128521;</span>
        </v-card-title>
      </v-card>
    </v-dialog>
  </v-row>
      </template>
    </v-navigation-drawer>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    source: String,
  },
  data: () => ({
    goDark: true,
    themeColor: true,
    dark: false,
    darkModeDialog: false,
    dialog: true,
    switchChange: false,
  }),
  components: {
  },
  computed: {
    ...mapGetters(['getDrawer', 'isAuthenticated', 'user', 'getDarkMode', 'getAdminTab']),
    colorChange() {
      if (this.getAdminTab) {
        return 'orange';
      }
      return '';
    },

    isAdmin() {
      return this.isAuthenticated && this.user.role === 'admin';
    },
  },

  methods: {
    setTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      // const data = {
      //   mode: this.$vuetify.theme.dark,
      // };
      // this.$store.dispatch('darkMode', data);
    },
    openAdminTab() {
      this.$store.dispatch('openAdminTab');
    },
    closeAdminTab() {
      this.$store.dispatch('closeAdminTab');
    },
    logout() {
      this.$store.dispatch('logout');
      setTimeout(() => {
        this.$vuetify.theme.dark = false;
      }, 3000);
    },
  },

  watch: {
    dark(newValue) {
      const value = JSON.parse(newValue);
      if (value === '' || !this.isAuthenticated) {
        return;
      }
      const data = {
        mode: value,
      };
      if (value === this.$vuetify.theme.dark) {
        return;
      }
      this.$vuetify.theme.dark = value;
      this.$store.dispatch('darkMode', data);
      setTimeout(() => {
        this.darkModeDialog = false;
        this.switchChange = false;
      }, 2000);
    },

  },

  mounted() {
    this.dark = JSON.parse(localStorage.getItem('darkMode'));
  },


};
</script>
