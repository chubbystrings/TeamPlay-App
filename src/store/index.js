/* eslint-disable dot-notation */
/* eslint-disable import/no-cycle */
/* eslint-disable quote-props */
/* eslint-disable-next-line dot-notation */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../auth-user';
import routes from '../router/index';


Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    adminTab: false,
    drawer: false,
    darkMode: null,
    link: '',
    user: {},
    error: '',
    isAuthenticated: false,
    successMsg: '',
    snackBar: false,
    feedData: [],
    postDetails: {
      postId: null,
      postLikes: 0,
    },
    userLiked: false,
    postData: {},
    postType: '',
    author: '',
    commentData: [],
    dialog: false,
    editDialog: false,
    mobileView: false,
  },

  mutations: {
    CHANGE_MOBILE_VIEW(state, value) {
      state.mobileView = value;
    },
    CLOSE_SUCCESS_MSG(state) {
      state.successMsg = '';
    },
    OPEN_DRAWER(state) {
      state.drawer = !state.drawer;
    },

    OPEN_ADMIN_TAB(state) {
      state.adminTab = true;
    },

    CLOSE_ADMIN_TAB(state) {
      state.adminTab = false;
    },

    DARKMODE(state, value) {
      state.darkMode = value;
    },
    SUCCESS_MSG(state, data) {
      state.successMsg = data;
      setTimeout(() => {
        state.successMsg = '';
      }, 3000);
    },
    OPEN_DIALOG(state) {
      state.dialog = true;
    },
    OPEN_EDIT_DIALOG(state) {
      state.editDialog = true;
    },
    CLOSE_DIALOG(state) {
      state.dialog = false;
    },
    CLOSE_EDIT_DIALOG(state) {
      state.editDialog = false;
    },
    AUTH_USER(state, userData) {
      state.user.token = userData.token;
      state.user.userId = userData.userId;
      state.user.role = userData.role;
      state.user.email = userData.email;
      state.user.firstName = userData.firstName;
      state.user.lastName = userData.lastName;
      state.isAuthenticated = true;
      state.darkMode = userData.darkMode;
    },
    ADD_USER(state, user) {
      state.user = user;
    },
    CREATE_COMMENT(state, data) {
      state.commentData = data;
    },

    ADD_COMMENT(state, data) {
      const newData = {
        id: data.data.id,
        commentAuthorId: state.user.userId,
        comment: data.data.comment,
        firstName: state.user.firstName,
        lastName: state.user.lastName,

      };
      state.commentData.unshift(newData);
    },
    CLEAR_DATA(state) {
      state.drawer = false;
      state.user = {};
      state.link = '';
      state.error = '';
      state.isAuthenticated = false;
      state.adminTab = false;
      state.darkMode = null;
    },

    CLEAR_ERROR(state) {
      state.error = '';
    },

    BACKDROP_MSG(state, link) {
      if (link === 'signin') {
        state.link = 'Authenticating';
      }

      if (link === 'logged') {
        state.link = 'Done';
      }

      if (link === 'signup') {
        state.link = 'Hold on';
      }

      if (link === 'signedup') {
        state.link = 'Done';
      }

      if (link === 'logout') {
        state.link = 'logging out...';
      }
      if (link === 'Loading') {
        state.link = 'please wait Loading Contents...';
      }
      if (link === 'delete') {
        state.link = 'Please wait while we delete..';
      }

      if (link === 'edit') {
        state.link = 'Please wait.....';
      }
    },

    EMPTY_LINK(state) {
      state.link = '';
    },

    ERROR_MSG(state, error) {
      state.error = error;
      setTimeout(() => {
        state.error = '';
      }, 3000);
    },

    FEED_DATA(state, data) {
      state.feedData = data;
    },

    AUTHOR_ID(state, authorId) {
      this.state.author = authorId;
    },

    POST_DETAILS(state, data) {
      state.postDetails = {
        postId: data.postId,
        postLikes: data.postLikes,
      };
    },
    USER_LIKED(state, data) {
      state.postDetails.userLiked = data;
    },

    UNLIKE(state, data) {
      state.postDetails.userLiked = data;
    },

    GET_POST_DATA(state, data) {
      state.postData.title = data.data.title;
      state.postData.id = data.data.id;
      state.postData.article = data.data.article ? data.data.article : '';
      state.postData.imageUrl = data.data.imageUrl ? data.data.imageUrl : '';
    },

    CLEAR_POST_DATA(state) {
      state.postData = {};
    },

  },
  actions: {
    clearData({ commit }) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('expiration');
      localStorage.removeItem('role');
      localStorage.removeItem('userFname');
      localStorage.removeItem('userLname');
      localStorage.removeItem('darkMode');
      commit('CLEAR_DATA');
    },

    mobileView({ commit }, value) {
      commit('CHANGE_MOBILE_VIEW', value);
    },

    openDrawer({ commit }) {
      commit('OPEN_DRAWER');
    },

    openAdminTab({ commit }) {
      routes.replace('/auth/admin');
      commit('OPEN_ADMIN_TAB');
    },

    closeAdminTab({ commit }) {
      commit('CLOSE_ADMIN_TAB');
      routes.push({ name: 'Home' });
    },

    darkMode({ commit, state }, data) {
      const url = '/auth/darkmode';
      const config = {
        headers: {
          'Authorization': `Bearer ${state.user.token}`,
        },

      };
      axios.patch(url, data, config)
        .then((res) => {
          const mode = res.data.data.darkMode;
          localStorage.setItem('darkMode', res.data.data.darkMode);
          commit('DARKMODE', mode);
        })
        .catch((error) => {
          commit('ERROR_MSG', error.response.status);
        });
    },
    errorMsg({ commit }, data) {
      commit('ERROR_MSG', data);
    },
    clearError({ commit }) {
      commit('CLEAR_ERROR');
    },
    closeSuccessMsg({ commit }) {
      commit('CLOSE_SUCCESS_MSG');
    },
    clearPostData({ commit }) {
      commit('CLEAR_POST_DATA');
    },
    clearLink({ commit }) {
      commit('EMPTY_LINK');
    },
    createComment({ commit }, data) {
      commit('CREATE_COMMENT', data);
    },
    openDialog({ commit }) {
      commit('OPEN_DIALOG');
    },
    closeDialog({ commit }) {
      commit('CLOSE_DIALOG');
    },
    openEditDialog({ commit }) {
      commit('OPEN_EDIT_DIALOG');
    },
    closeEditDialog({ commit }) {
      commit('CLOSE_EDIT_DIALOG');
    },
    createUser({ commit, dispatch, state }, userData) {
      axios.defaults.headers.common.Authorization = `Bearer ${state.user.token}`;
      axios.post('/auth/create-user', {
        roleId: userData.roleId,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        department: userData.department,
        jobRole: userData.jobRole,
        gender: userData.gender,
        address: userData.address,
      }, { timeout: 10000 })
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          dispatch('backdropMsg', 'signedup');
          commit('CLEAR_ERROR');
          commit('SUCCESS_MSG', `User Created ${res.data.status}`);
          commit('EMPTY_LINK');
        })
        .catch((error) => {
          if (error.code === 'ECONNABORTED' || error.response === undefined) {
            commit('ERROR_MSG', 501);
            commit('EMPTY_LINK');
          } else {
            commit('ERROR_MSG', error.response.status);
            commit('EMPTY_LINK');
          }
        });
    },

    login({ commit, dispatch }, authData) {
      axios.post('/auth/signin', {
        email: authData.email,
        password: authData.password,
      }, { timeout: 15000 })
        .then((res) => {
          localStorage.setItem('token', res.data.data.token);
          localStorage.setItem('userId', res.data.data.userId);
          localStorage.setItem('userFname', res.data.data.firstName);
          localStorage.setItem('userLname', res.data.data.lastName);
          localStorage.setItem('role', res.data.data.role);
          localStorage.setItem('expiration', res.data.data.expirationTime);
          localStorage.setItem('darkMode', res.data.data.darkMode);
          commit('AUTH_USER', {
            token: res.data.data.token,
            userId: res.data.data.userId,
            role: res.data.data.role,
            firstName: res.data.data.firstName,
            lastName: res.data.data.lastName,
            email: res.data.data.email,
            darkMode: res.data.data.darkMode,
          });
          commit('CLEAR_ERROR');
          dispatch('backdropMsg', 'logged');
          routes.replace('/');
          routes.go();
          setTimeout(() => {
            commit('EMPTY_LINK');
          }, 2000);
        })
        .catch((error) => {
          if (error.code === 'ECONNABORTED' || error.response === undefined) {
            commit('ERROR_MSG', 408);
            commit('EMPTY_LINK');
          } else {
            commit('ERROR_MSG', error.response.status);
            commit('EMPTY_LINK');
          }
        });
    },

    tryAutoLogin({ commit }) {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const expirationDate = localStorage.getItem('expiration');
      const now = new Date();
      if (now >= expirationDate * 1000) {
        return;
      }
      const userId = localStorage.getItem('userId');
      const userFname = localStorage.getItem('userFname');
      const userLname = localStorage.getItem('userLname');
      const userRole = localStorage.getItem('role');
      const userEmail = localStorage.getItem('email');
      const darkMode = JSON.parse(localStorage.getItem('darkMode'));
      commit('AUTH_USER', {
        token,
        userId,
        firstName: userFname,
        lastName: userLname,
        email: userEmail,
        role: userRole,
        darkMode,
      });
    },

    isActive({ commit, dispatch, state }, data) {
      dispatch('backdropMsg', 'Loading');
      const url = '/auth/users/user/isactive';
      const config = {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      };

      axios.patch(url, data, config)
        .then((res) => {
          commit('EMPTY_LINK');
          commit('SUCCESS_MSG', `Updated ${res.data.status}`);
        })
        .catch((error) => {
          commit('EMPTY_LINK');
          commit('ERROR_MSG', error);
        });
    },

    logout({ commit, dispatch }) {
      dispatch('backdropMsg', 'logout');
      setTimeout(() => {
        commit('EMPTY_LINK');
        dispatch('clearData');
      }, 2000);
      routes.replace({ name: 'Signin' });
    },

    backdropMsg({ commit }, msg) {
      commit('BACKDROP_MSG', msg);
    },

    deleteUser({ commit, dispatch, state }, data) {
      dispatch('backdropMsg', 'Loading');
      const url = `/auth/users/user/${data.userId}`;
      const config = {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      };

      axios.delete(url, config)
        .then((res) => {
          commit('SUCCESS_MSG', `Deleted ${res.data.status}`);
          commit('EMPTY_LINK');
        })
        .catch((error) => {
          commit('EMPTY_LINK');
          commit('ERROR_MSG', error);
        });
    },

    deleteMany({ commit, dispatch, state }, data) {
      dispatch('backdropMsg', 'Loading');
      const url = `/auth/users/deletemany?ids=${data.ids}`;
      const config = {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      };
      axios.delete(url, config)
        .then((res) => {
          commit('SUCCESS_MSG', `Deleted ${res.data.status}`);
          commit('EMPTY_LINK');
        })
        .catch((error) => {
          commit('EMPTY_LINK');
          commit('ERROR_MSG', error);
        });
    },

    createArticle({ commit, state }, articleData) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.user.token}`;
      axios.post('/articles', {
        title: articleData.title,
        content: articleData.content,
      })
        .then((res) => {
          commit('EMPTY_LINK');
          routes.replace({ name: 'Home' });
          commit('SUCCESS_MSG', `Created ${res.data.status}`);
        })
        .catch((error) => {
          commit('ERROR_MSG', error.response.status);
          commit('EMPTY_LINK');
        });
    },

    // eslint-disable-next-line no-unused-vars
    createGif({ commit, state }, gifData) {
      const url = '/gifs';
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${state.user.token}`,
        },
      };
      axios.post(url, gifData, config)
        .then((res) => {
          commit('EMPTY_LINK');
          routes.replace({ name: 'Home' });
          commit('SUCCESS_MSG', `Created ${res.data.status}`);
        })
        .catch((error) => {
          commit('ERROR_MSG', error.response.status);
          commit('EMPTY_LINK');
        });
    },

    // eslint-disable-next-line no-unused-vars
    feed({ commit, state }) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.user.token}`;
      axios.get('/feed')
        .then((res) => {
          commit('FEED_DATA', res.data.data);
          commit('EMPTY_LINK');
        })
        .catch((error) => {
          commit('ERROR_MSG', error.response.status);
          commit('EMPTY_LINK');
        });
    },

    author({ commit }, authorId) {
      commit('AUTHOR_ID', authorId);
    },
    userLiked({ commit }, data) {
      commit('USER_LIKED', data);
    },
    userUnlike({ commit }, data) {
      commit('UNLIKE', data);
    },
    postDetails({ commit }, data) {
      commit('POST_DETAILS', data);
    },

    likePost({ commit, state }, data) {
      const url = `/feed/like/${data.postId}`;
      const config = {
        headers: {
          'Authorization': `Bearer ${state.user.token}`,
        },
      };
      axios.post(url, config)
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
        })
        .catch((error) => {
          commit('ERROR_MSG', error.response.status);
        });
    },

    unlikePost({ commit, state }, data) {
      const url = `/feed/like/${data.postId}`;
      const config = {
        headers: {
          'Authorization': `Bearer ${state.user.token}`,
        },
      };
      axios.delete(url, config)
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
        })
        .catch((error) => {
          commit('ERROR_MSG', error.response.status);
        });
    },

    // eslint-disable-next-line no-unused-vars
    viewPost({ commit, state }, postData) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.user.token}`;
      this.postType = postData.postType;
      if (postData.postType === 'article') {
        axios.get(`/articles/${postData.id}/comment`)
          .then((res) => {
            commit('GET_POST_DATA', res.data);
          })
          .catch((error) => {
            commit('ERROR_MSG', error);
          });
      }
      if (postData.postType === 'gif') {
        axios.get(`/gifs/${postData.id}/comment`)
          .then((res) => {
            commit('GET_POST_DATA', res.data);
          })
          .catch((error) => {
            commit('ERROR_MSG', error);
          });
      }
    },

    // eslint-disable-next-line no-unused-vars
    addComment({ commit, dispatch, state }, commentData) {
      let url;
      if (commentData.postType === 'article') {
        url = `/articles/${commentData.id}/comment`;
      }

      if (commentData.postType === 'gif') {
        url = `/gifs/${commentData.id}/comment`;
      }
      const config = {
        headers: {
          'Authorization': `Bearer ${state.user.token}`,
        },
      };
      axios.post(url, { content: commentData.comment }, config)
        .then((res) => {
          commit('ADD_COMMENT', res.data);
        })
        .catch((error) => {
          routes.push('/');
          commit('ERROR_MSG', error.response.status);
        });
    },

    editArticle({ commit, dispatch, state }, data) {
      const url = `/articles/${data.id}`;
      const config = {
        headers: {
          'Authorization': `Bearer ${state.user.token}`,
        },
      };
      axios.patch(url, data, config)
        .then((res) => {
          dispatch('closeEditDialog');
          commit('EMPTY_LINK');
          commit('SUCCESS_MSG', `Updated ${res.data.status}`);
          routes.replace({ name: 'Home' });
        })
        .catch((error) => {
          commit('EMPTY_LINK');
          commit('ERROR_MSG', error);
        });
    },

    deletePost({ commit, dispatch, state }, data) {
      dispatch('closeDialog');
      let url;
      if (data.postType === 'article') {
        url = `/articles/${data.id}`;
      }

      if (data.postType === 'gif') {
        url = `/gifs/${data.id}`;
      }
      const config = {
        headers: {
          'Authorization': `Bearer ${state.user.token}`,
        },
      };
      axios.delete(url, config)
        .then((res) => {
          commit('EMPTY_LINK');
          routes.replace({ name: 'Home' });
          commit('SUCCESS_MSG', `Deleted ${res.data.status}`);
        })
        .catch((error) => {
          commit('ERROR_MSG', error);
        });
    },
  },
  getters: {
    getDrawer(state) {
      return state.drawer;
    },
    errorMsg(state) {
      return state.error;
    },
    user(state) {
      return state.user;
    },
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    darkMode(state) {
      return state.darkMode;
    },
    link(state) {
      return state.link;
    },
    successMsg(state) {
      return state.successMsg;
    },
    getFeedData(state) {
      return state.feedData;
    },
    getPostData(state) {
      return state.postData;
    },
    error(state) {
      return state.error;
    },
    editDialog(state) {
      return state.editDialog;
    },
    getDarkMode(state) {
      return state.darkMode;
    },
    getAdminTab(state) {
      return state.adminTab;
    },
    getMobileViewStatus(state) {
      return state.mobileView;
    },
  },
  modules: {
  },
});
