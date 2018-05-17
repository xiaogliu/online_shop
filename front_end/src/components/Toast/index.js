import Vue from 'vue';
import t from './Toast.vue';

// 创建 Toast 构造函数
const ToastConstructor = Vue.extend(t);

const removeDom = event => {
  event.target.parentNode.removeChild(event.target);
};

// 添加关闭 Toast 方法
ToastConstructor.prototype.close = function() {
  this.visible = false;
  // Vue 自带过度结束后，触发回调函数
  // 这里要在 transitionend 结束后移除 dom
  // 不然移除 dom 时看不到过度动画
  this.$el.addEventListener('transitionend', removeDom);
};

// 组件中调用 Toast 函数，显示 Toast 提示
const Toast = (options = {}) => {
  // 创建 Toast 实例，同时将它挂载到自己创建的元素上
  // 此后 Toast 实例可以访问在 Toast.vue 中定义的属性和方法
  const instance = new ToastConstructor().$mount(document.createElement('div'));

  // 设置参数
  const duration = options.duration || 2500;
  // 调用的时候支持直接输入字符串
  instance.message = typeof options === 'string' ? options : options.message;
  instance.position = options.position || 'top';
  document.body.appendChild(instance.$el);

  instance.visible = true;

  // 等 Vue 当前更新队列完成，关闭 Toast
  Vue.nextTick(() => {
    instance.timer = setTimeout(() => {
      instance.close();
    }, duration);
  });

  return instance;
};

export default Toast;
