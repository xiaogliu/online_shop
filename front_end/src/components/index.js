import Dialog from './Dialog.vue';
import Swiper from './Swiper.vue';

const components = {
  install(Vue) {
    Vue.component('Dialog', Dialog);
    Vue.component('Swiper', Swiper);
  },
};

export default components;
