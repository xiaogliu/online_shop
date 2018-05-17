import Vue from 'vue';
import Router from 'vue-router';
import Login from '../pages/Login.vue';
import Signup from '../pages/Signup.vue';
import ResetPwd from '../pages/ResetPwd.vue';
import Home from '../pages/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    // {
    //   path: '/capital',
    //   name: 'index',
    //   component: Index,
    //   // children: [
    //   //   {
    //   //     path: '/trade',
    //   //     name: 'trade',
    //   //     component: Trade,
    //   //   },
    //   // ],
    // },
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
      path: '/resetPwd',
      name: 'resetPwd',
      component: ResetPwd,
    },
    {
      path: '*',
      redirect: '/home',
    },
  ],
});
