<template>
  <div class="home">
    <!-- <transition name='fade'> -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    <!-- </transition> -->
    <div class="tabbar">
      <router-link to="/home/main" tag='div' class="tab-item">
        <div class="tab-icon tab-icon-home"></div>
        <!-- <img src="../../assets/img/home.svg" alt="home"> -->
        <p>首页</p>
      </router-link>
      <div class="tab-item">
        <router-link to="/home/allProduct" tag='div' class="tab-item">
          <div class="tab-icon tab-icon-all"></div>
          <!-- <img src="../../assets/img/all.svg" alt="home"> -->
          <p>分类</p>
        </router-link>
      </div>
      <router-link to="/home/cart" tag='div' class="tab-item">
        <div class="tab-icon tab-icon-cart"></div>
        <!-- <img src="../../assets/img/cart.svg" alt="home"> -->
        <p>购物车</p>
      </router-link>
      <router-link to="/home/people" tag='div' class="tab-item">
        <div class="tab-icon tab-icon-people"></div>
        <!-- <img src="../../assets/img/people.svg" alt="home"> -->
        <p>我的</p>
      </router-link>
    </div>
  </div>
</template>

<script>
// import requests from '../lib/requests';
// import utils from '../lib/utils';

export default {
  name: 'AccountantAccount',
  data() {
    return {
      isLogin: false,
      gtcPrice: 0,
      gtcNum: 0,
      utils: '',
      selected: '外卖',
    };
  },
  methods: {
    goPage() {
      this.$router.push('/login');
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  min-height: 100vh;
  .tabbar {
    position: fixed;
    bottom: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    height: pxToRem(96px);
    padding: 0 pxToRem(30px);
    background-color: #fff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    .tab-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: pxToRem(86px);
      font-size: $fontSizeSmallX;
      text-align: center;
      p {
        transition: all .3s;
      }
      .tab-icon {
        width: pxToRem(56px);
        height: pxToRem(56px);
        background-size: 100%;
        transition: all .3s;
      }
      .tab-icon-home {
        background-image: url('../../assets/img/home.svg');
      }
      .tab-icon-all {
        background-image: url('../../assets/img/all.svg');
      }
      .tab-icon-cart {
        background-image: url('../../assets/img/cart.svg');
      }
      .tab-icon-people {
        background-image: url('../../assets/img/people.svg');
      }
    }
    .router-link-active {
      p {
        color: $colorMain;
      }
      .tab-icon-home {
        background-image: url('../../assets/img/home_active.svg');
      }
      .tab-icon-all {
        background-image: url('../../assets/img/all_active.svg');
      }
      .tab-icon-cart {
        background-image: url('../../assets/img/cart_active.svg');
      }
      .tab-icon-people {
        background-image: url('../../assets/img/people_active.svg');
      }
    }
  }
  .fade-enter-active {
    transition: opacity .3s;
  }
  .fade-enter{
    opacity: 0;
  }
}
</style>
