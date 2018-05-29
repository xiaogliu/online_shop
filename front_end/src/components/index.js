import Dialog from './Dialog.vue';
import Slider from './Slider.vue';

const components = {
  install(Vue) {
    Vue.component('Dialog', Dialog);
    Vue.component('Slider', Slider);
  },
};

export default components;
