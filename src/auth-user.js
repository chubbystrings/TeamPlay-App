import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_TEAMWORK_URL_PROD : process.env.VUE_APP_TEAMWORK_URL_DEV,

});

export default instance;
