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
import ProductDetail from '../pages/ProductDetail.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      // 尽量不要直接访问 /home 路径，而是直接访问 /home/main
      // 不使用默认子路由是为了使 tab 路由切换看上去更一致
      path: '/home',
      name: 'home',
      redirect: '/home/main',
      component: Home,
      children: [
        {
          path: 'main',
          name: 'main',
          component: Main,
        },
        {
          path: 'allProduct',
          name: 'allProduct',
          component: AllProduct,
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
    {
      path: '/product/:id',
      name: 'productDetail',
      component: ProductDetail,
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
