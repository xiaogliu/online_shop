import Vue from 'vue';
import l from './Loading.vue';

// 创建 Loading 构造函数
const LoadingConstructor = Vue.extend(l);

let instance;
const Loading = {
  open(options = {}) {
    // 避免建立太多 Vue 子实例
    if (!instance) {
      instance = new LoadingConstructor().$mount(document.createElement('div'));
    }
    if (instance.visible) return;
    // 设置参数
    instance.message = typeof options === 'string' ? options : options.message;
    instance.position = options.position || 'middle';
    document.body.appendChild(instance.$el);

    instance.visible = true;
  },

  close() {
    if (instance) {
      instance.visible = false;
      instance.$el.parentNode.removeChild(instance.$el);
    }
  },
};

export default Loading;
