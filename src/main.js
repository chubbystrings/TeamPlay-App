import Vue from 'vue';
import Vuelidator from 'vuelidate';
import axios from 'axios';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';


Vue.config.productionTip = false;

Vue.use(Vuelidator);

axios.defaults.baseURL = process.env.VUE_APP_TEAMWORK_BASE_URL;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
