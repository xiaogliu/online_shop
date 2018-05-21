import Vue from 'vue';
import App from './App.vue';
import store from './lib/store';
import router from './router';
import components from './components';
import './lib/rem';

Vue.use(components);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
