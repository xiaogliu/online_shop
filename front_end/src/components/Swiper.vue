<template>
  <div id="swiper" ref="swiper">
    <div id="swiperContainer" ref="swiperContainer">
      <slot></slot>
    </div>
    <div class="nav">
      <p class="nav-dot"
        :class="{active: currentPageIndex === index}"
        v-for="(item, index) in navDots"
        :key="index">
        <span></span>
      </p>
    </div>
  </div>
</template>

<script>
import utils from '../assets/js/utils';

export default {
  name: 'swiper',
  props: {
    autoPlay: {
      type: Boolean,
      default: true,
    },
    interval: {
      type: Number,
      default: 4000,
    },
    swiperHeight: {
      type: Number,
      default: 360,
    },
  },
  data() {
    return {
      swiper: null,
      swiperContainer: null,
      pages: null,
      pageWidth: 0,
      currentContainerLeft: 0,
      navDots: [],
      newPages: [],
      currentPageIndex: 0,
      startX: 0,
      timer: undefined,
      autoPlayTimer: undefined,
      TRANSITION_TIME: 400,
    };
  },
  methods: {
    init() {
      this.swiper = this.$refs.swiper;
      this.swiper.style.height = utils.pxToRem(this.swiperHeight);
      this.swiperContainer = this.$refs.swiperContainer;
      this.pages = this.swiperContainer.children;
      this.pages = [].slice.call(this.pages);
      this.pagesNum = this.pages.length;
      this.navDots = new Array(this.pagesNum);
      this.pageWidth = document.documentElement.clientWidth;
      this.currentContainerLeft = -this.pageWidth;
      this.swiperContainer.style.transform = `translate3d(${
        this.currentContainerLeft
      }px, 0, 0)`;
    },
    copyPage() {
      // 处理前后页面：复制最后一页到第一页，复制第二页到最后一页
      const firstPage = this.pages[0].cloneNode(true);
      const lastPage = this.pages[this.pagesNum - 1].cloneNode(true);
      this.swiperContainer.appendChild(firstPage);
      this.swiperContainer.insertBefore(lastPage, this.pages[0]);

      // 增多的两页放到新数组
      this.newPages = Array.prototype.slice.call(this.pages);
      this.newPages.push(firstPage, lastPage);
    },
    // 手机滑动结束
    touchEnd(event) {
      this.autoPlaySwiper();
      const endX = event.changedTouches[0].pageX;
      // 判断手指移动方向
      if (endX - this.startX > 0) {
        // 向前移动
        this.movePage(this.pageWidth, -this.pageWidth * this.pagesNum);
      } else {
        // 向后移动
        this.movePage(-this.pageWidth, -this.pageWidth);
      }
    },
    movePage(offsetWidth, moveTo) {
      // 调整位置
      const adjustPosition = () => {
        this.swiperContainer.style.transitionDuration = '0ms';

        // 超出lastPage，moveTo -this.pageWidth；超出firstPage，moveTo -this.pageWidth * this.pagesNum
        this.currentContainerLeft = moveTo;
        this.swiperContainer.style.transform = `translate3d(${moveTo}px, 0, 0)`;
        this.changeNavStyle();
      };

      // 避免前后快速滑动出现白屏
      if (
        (this.currentContainerLeft > -this.pageWidth && this.timer) ||
        (this.currentContainerLeft < -this.pageWidth * this.pagesNum &&
          this.timer)
      ) {
        clearTimeout(this.timer);
        adjustPosition();
        return;
      }

      // 正常移动page
      this.currentContainerLeft += offsetWidth;
      this.turnPage(this.currentContainerLeft);

      // 滑动到最前最后调整page
      if (
        this.currentContainerLeft > -this.pageWidth ||
        this.currentContainerLeft < -this.pageWidth * this.pagesNum
      ) {
        this.timer = setTimeout(adjustPosition, this.TRANSITION_TIME);
      } else {
        // 这里要 bind this ！！！！！！
        this.timer = setTimeout(
          this.changeNavStyle.bind(this),
          this.TRANSITION_TIME,
        );
      }
    },
    turnPage(position) {
      this.swiperContainer.style.transitionDuration = `${
        this.TRANSITION_TIME
      }ms`;
      this.swiperContainer.style.transform = `translate3d(${position}px, 0, 0)`;
    },
    changeNavStyle() {
      // 取消所有高亮
      this.currentPageIndex = -1;

      // 重新设置高亮
      this.currentPageIndex = -this.currentContainerLeft / this.pageWidth - 1;
      // this.navDots[i - 1].classList.add('active');
    },
    autoPlaySwiper() {
      // 自动播放
      if (this.autoPlay) {
        this.autoPlaySwiper = function() {
          this.autoPlayTimer = setInterval(() => {
            this.movePage(-this.pageWidth, -this.pageWidth);
          }, this.interval);
        };
        this.autoPlaySwiper();
      }
    },
    // window resize 时重新获取位置
    getNewPosition() {
      this.pageWidth = document.documentElement.clientWidth;
      this.currentContainerLeft = -(this.currentPageIndex * this.pageWidth);
      this.swiperContainer.style.transform = `translate3d(${
        this.currentContainerLeft
      }px, 0, 0)`;
    },
    handleWindowResize(event) {
      // 设置防抖动函数
      utils.debounce(this.getNewPosition, this, event, 500);
    },
  },
  mounted() {
    this.init();
    this.copyPage();
    this.autoPlaySwiper();

    // 手机触屏屏幕
    this.swiperContainer.addEventListener('touchstart', event => {
      clearInterval(this.autoPlayTimer);
      this.startX = event.touches[0].pageX;
    });
    const handleTouchEnd = utils.throttle(this.touchEnd, this, 500);
    this.swiperContainer.addEventListener('touchend', handleTouchEnd);

    // 如果指定宽度，不随窗口变化
    window.addEventListener('resize', this.handleWindowResize.bind(this));
  },
};
</script>

<style lang="scss" scoped>
#swiper {
  position: relative;
  width: 100vw;
  transition: width 500ms;
  overflow: hidden;
  #swiperContainer {
    position: absolute;
    height: 100%;
    display: flex;
    transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
    touch-action: none;
    .page {
      width: 100vw;
      transition: width 500ms;
      height: 100%;
      img {
        width: 100vw;
        max-width: 100vw;
        height: 100%;
      }
    }
  }
  .nav {
    position: absolute;
    bottom: pxToRem(10px);
    left: 50%;
    display: flex;
    transform: translateX(-50%);
    p {
      width: pxToRem(20px);
      height: pxToRem(20px);
      padding: pxToRem(8px) pxToRem(8px);
      margin: 0 auto;
      cursor: pointer;
      span {
        display: block;
        position: relative;
        width: pxToRem(12px);
        height: pxToRem(12px);
        margin: 0 auto;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: pxToRem(6px);
        transition: all 150ms ease-in-out;
      }
      &.active span {
        background-color: #fff;
      }
    }
  }
}
</style>
