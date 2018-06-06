<template>
  <transition name='fade'>
    <div v-show='visible'>
      <div :class='position' class='loading'>
        <div class="sk-circle">
          <div class="sk-circle1 sk-child"></div>
          <div class="sk-circle2 sk-child"></div>
          <div class="sk-circle3 sk-child"></div>
          <div class="sk-circle4 sk-child"></div>
          <div class="sk-circle5 sk-child"></div>
          <div class="sk-circle6 sk-child"></div>
          <div class="sk-circle7 sk-child"></div>
          <div class="sk-circle8 sk-child"></div>
          <div class="sk-circle9 sk-child"></div>
          <div class="sk-circle10 sk-child"></div>
          <div class="sk-circle11 sk-child"></div>
          <div class="sk-circle12 sk-child"></div>
          <!-- <img src="../../assets/img/loading.svg" alt=""> -->
        </div>
        <p>{{message}}</p>
      </div>
      <div class="loading-mask"></div>
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
.loading-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
}
.loading {
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
    top: 40%;
  }
  &.bottom {
    top: 90%;
  }
  .sk-circle {
    width: pxToRem(80px);
    height: pxToRem(80px);
    position: relative;
    .sk-child {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      &:before {
        content: '';
        display: block;
        margin: 0 auto;
        width: 15%;
        height: 15%;
        background-color: #ddd;
        border-radius: 100%;
        animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
      }
    }
    .sk-circle2 {
      transform: rotate(30deg);
      &:before {
        animation-delay: -1.1s;
      }
    }
    .sk-circle3 {
      transform: rotate(60deg);
      &:before {
        animation-delay: -1s;
      }
    }
    .sk-circle4 {
      transform: rotate(90deg);
      &:before {
        animation-delay: -0.9s;
      }
    }
    .sk-circle5 {
      transform: rotate(120deg);
      &:before {
        animation-delay: -0.8s;
      }
    }
    .sk-circle6 {
      transform: rotate(150deg);
      &:before {
        animation-delay: -0.7s;
      }
    }
    .sk-circle7 {
      transform: rotate(180deg);
      &:before {
        animation-delay: -0.6s;
      }
    }
    .sk-circle8 {
      transform: rotate(210deg);
      &:before {
        animation-delay: -0.5s;
      }
    }
    .sk-circle9 {
      transform: rotate(240deg);
      &:before {
        animation-delay: -0.4s;
      }
    }
    .sk-circle10 {
      transform: rotate(270deg);
      &:before {
        animation-delay: -0.3s;
      }
    }
    .sk-circle11 {
      transform: rotate(300deg);
      &:before {
        animation-delay: -0.2s;
      }
    }
    .sk-circle12 {
      transform: rotate(330deg);
      &:before {
        animation-delay: -0.1s;
      }
    }
    @keyframes sk-circleBounceDelay {
      0%,
      80%,
      100% {
        transform: scale(0);
      }
      40% {
        transform: scale(1);
      }
    }
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
