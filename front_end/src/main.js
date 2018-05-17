import Vue from 'vue';
import App from './App.vue';
import store from './lib/store';
import router from './router';
import './lib/rem';

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
