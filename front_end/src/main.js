import Vue from 'vue';
import {
  Button,
  Navbar,
  TabItem,
  TabContainer,
  TabContainerItem,
  InfiniteScroll,
} from 'mint-ui';
import App from './App.vue';
import store from './lib/store';
import router from './router';
import './lib/rem';

// mint-ui 按需引入，需要什么组件引入什么组件
Vue.component(Button.name, Button);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.use(InfiniteScroll);
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
