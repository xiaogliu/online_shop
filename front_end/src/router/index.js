import Vue from 'vue';
import Router from 'vue-router';
import Login from '../pages/Login.vue';
import Signup from '../pages/Signup.vue';
import ResetPwd from '../pages/ResetPwd.vue';
import Home from '../pages/home/Index.vue';
import AllProduct from '../pages/home/AllProduct.vue';
import Main from '../pages/home/Main.vue';
import Cart from '../pages/home/Cart.vue';
import People from '../pages/home/People.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'allProduct',
          name: 'allProduct',
          component: AllProduct,
        },
        {
          path: 'main',
          name: 'main',
          component: Main,
        },
        {
          path: 'cart',
          name: 'cart',
          component: Cart,
        },
        {
          path: 'people',
          name: 'people',
          component: People,
        },
      ],
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
      redirect: '/home/main',
    },
  ],
});
