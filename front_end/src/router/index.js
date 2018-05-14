import Vue from 'vue';
import Router from 'vue-router';
import Index from '../components/Index.vue';
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';
import ResetPwd from '../components/ResetPwd.vue';
import Home from '../components/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/capital',
      name: 'index',
      component: Index,
      // children: [
      //   {
      //     path: '/trade',
      //     name: 'trade',
      //     component: Trade,
      //   },
      // ],
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
    },
    {
      path: '/resetPw',
      name: 'resetPw',
      component: ResetPwd,
    },
    {
      path: '*',
      redirect: '/home',
    },
  ],
});
