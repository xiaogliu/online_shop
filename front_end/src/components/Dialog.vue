<template>
  <transition name="fade">
    <div class="dialog" v-show="visible" @click="handleClose">
      <!-- 阻止事件冒泡 -->
      <div class="main" @click.stop="1">
        <header>
          <h2>{{ title }}</h2>
        </header>
        <main>
          <slot>确定执行此操作？</slot>
        </main>
        <footer>
          <button @click="handleClose">否</button>
          <slot name="confirm-btn">
            <button @click="handleClose">是</button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: '提示',
    },
    // visible 双向控制，这是从父元素传递进来的值
    visible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClose() {
      // 这是自元素传递给父元素的值
      this.$emit('update:visible', false);
    },
  },
};
</script>

<style lang="scss">
.dialog {
  $header-footer-height: pxToRem(80px);
  $border-radius: pxToRem(20px);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  .main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 80%;
    min-height: pxToRem(300px);
    background-color: #fff;
    border-radius: $border-radius;
    header {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 pxToRem(24px);
      height: $header-footer-height;
      h2 {
        font-size: pxToRem(32px);
      }
    }
    main {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      padding: 0 pxToRem(24px) pxToRem(40px);
      color: #666;
      font-size: pxToRem(32px);
    }
    footer {
      display: flex;
      box-sizing: border-box;
      height: $header-footer-height;
      width: 100%;
      border-top: 1px solid #ccc;
      button {
        width: 50%;
        height: $header-footer-height;
        color: #006aff;
        background-color: #fff;
        &:first-child {
          border-right: 1px solid #ccc;
          border-bottom-left-radius: $border-radius;
        }
        &:last-child {
          border-bottom-right-radius: $border-radius;
        }
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
