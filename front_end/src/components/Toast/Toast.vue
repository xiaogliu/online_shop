<template>
  <transition name='fade'>
    <div v-show='visible' :class='position' class='toast'>
      <p>{{message}}</p>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      message: '',
      position: '',
    };
  },
};
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  max-width: 80%;
  padding: pxToRem(20px);
  font-size: pxToRem(28px);
  color: #fff;
  word-wrap: break-word;
  text-align: center;
  z-index: 9999;
  border-radius: pxToRem(10px);
  background: rgba(0, 0, 0, 0.7);
  &.top {
    top: 10%;
  }
  &.middle {
    top: 50%;
  }
  &.bottom {
    top: 90%;
  }
}
// 元素进入前或者消失前，opacity 默认为 1
// 不需要单独设置
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
