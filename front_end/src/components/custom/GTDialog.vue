<template>
  <transition name="fade">
    <div class="gt-dialog" v-show="visible" @click="handleClose()">
      <!-- 阻止事件冒泡 -->
      <div class="main" @click.stop="1">
        <header>
          <h2>{{ title }}</h2>
        </header>
        <main>
          <slot name='main'></slot>
        </main>
        <footer>
          <slot name="footer"></slot>
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
      default: '',
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

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.gt-dialog {
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99999;
  .main {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    width: pxToRem(600px);
    height: pxToRem(300px);
    background-color: #fff;
    border-radius: pxToRem(20px);
    header {
      position: relative;
      height: pxToRem(72px);
      color: #333;
      h2 {
        font-size: pxToRem(28px);
        text-align: center;
        line-height: pxToRem(72px);
      }
      .close-btn {
        position: absolute;
        top: 0;
        right: 0;
        display: inline-block;
        width: pxToRem(72px);
        height: pxToRem(72px);
        background: url('https://static-https.lansheng8.com/close_dialog.png')
          no-repeat center;
        transition: 0.2s all;
        &:hover {
          cursor: pointer;
          background: url('https://static-https.lansheng8.com/close_dialog_hover.png')
            no-repeat center;
        }
      }
    }
    main {
      height: pxToRem(50px);
      padding-top: pxToRem(24px);
      text-align: center;
      color: #333;
      font-size: pxToRem(28px);
    }
    footer {
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
      width: 100%;
      height: pxToRem(80px);
      display: flex;
      justify-content: space-around;
      &:after {
        content: '';
        position: absolute;
        top: 0;
        background: #007480;
        width: 100%;
        height: 1px;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
      }
    }
  }
}
</style>
