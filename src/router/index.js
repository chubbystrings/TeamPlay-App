import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import SignUp from '../views/Signup.vue';
import SignIn from '../views/Signin.vue';
import Post from '../views/Post.vue';
import page404 from '../views/404.vue';
import CreatePost from '../views/CreatePost.vue';
import AuthAdmin from '../views/AuthAdmin.vue';
// eslint-disable-next-line import/no-cycle
import store from '../store/index';


Vue.use(VueRouter);

const authenticate = (to, from, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    const expirationDate = localStorage.getItem('expiration');
    const now = new Date();
    if (now >= expirationDate * 1000) {
      store.dispatch('clearData');
      next({ name: 'Signin' });
    } else {
      next();
    }
  } else {
    next({ name: 'Signin' });
  }
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignUp,
    beforeEnter(to, from, next) {
      authenticate(to, from, next);
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/signin',
    name: 'Signin',
    component: SignIn,
  },

  {
    path: '/post/:id',
    name: 'Post',
    component: Post,
    beforeEnter(to, from, next) {
      if (!from.name) {
        if (!to.query || !to.params || !Number(to.params.id)) {
          next({ name: 'Home' });
        }
      }

      if (to.query.post === 'gif' || to.query.post === 'article') {
        store.dispatch('tryAutoLogin');
        authenticate(to, from, next);
      } else {
        next({ name: 'Home' });
      }
    },
  },
  {
    path: '/create-post',
    name: 'CreatePost',
    component: CreatePost,
    beforeEnter(to, from, next) {
      authenticate(to, from, next);
      store.dispatch('tryAutoLogin');
    },
  },

  {
    path: '/auth/admin',
    name: 'AuthAdmin',
    component: AuthAdmin,
    beforeEnter(to, from, next) {
      authenticate(to, from, next);
      store.dispatch('tryAutoLogin');
      if (store.state.user.role === 'admin') {
        next();
      } else {
        store.dispatch('errorMsg', 'Unauthorized!!');
        next({ name: 'Home' });
      }
    },
  },

  {
    path: '*',
    name: '404',
    component: page404,

  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.afterEach((to) => {
  localStorage.setItem('LS_ROUTE_KEY', to.name);
});

export default router;
