<template>
  <div class="home">
    <div class="logo">
      <img src="../assets/img/coin.png" alt="GTB">
    </div>
    <div class="price">
      <p>当前价格</p>
      <!-- <p>1GTB = {{ gtcPrice / 100 }}USD</p> -->
    </div>
    <div class="account">
      <p>当前数量</p>
      <!-- <p>{{ utils.formatMoney(gtcNum) }}</p> -->
    </div>
    <div class="button">
      <!-- <button v-show="this.isLogin" @click="buy">立即购买</button> -->
      <button @click="goPage">登录/注册</button>
    </div>
    <div class="tabbar">
      <div class="tab-item">
        <img src="../assets/img/home.svg" alt="home">
        <p>首页</p>
      </div>
      <div class="tab-item">
        <img src="../assets/img/all.svg" alt="home">
        <p>分类</p>
      </div>
      <div class="tab-item">
        <img src="../assets/img/cart.svg" alt="home">
        <p>购物车</p>
      </div>
      <div class="tab-item">
        <img src="../assets/img/people.svg" alt="home">
        <p>我的</p>
      </div>
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
  background: url('../assets/img/home_bg.jpg') 100% / cover;
  .account,
  .button,
  .logo,
  .price {
    width: 100%;
    text-align: center;
  }
  .logo {
    padding: pxToRem(170px) 0 pxToRem(90px);
    img {
      width: pxToRem(150px);
    }
  }
  .account,
  .price {
    margin-bottom: pxToRem(54px);
    p:first-child {
      font-size: pxToRem(44px);
      color: #fff;
      margin-bottom: pxToRem(10px);
    }
    p:last-child {
      font-size: pxToRem(64px);
      color: #ffda44;
    }
  }
  .button {
    margin-top: pxToRem(160px);
    button {
      width: pxToRem(600px);
      height: pxToRem(100px);
      line-height: pxToRem(100px);
      margin: 0 auto;
      color: #007480;
      font-size: pxToRem(34px);
      background-color: #ffda44;
    }
  }
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
    .tab-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: pxToRem(86px);
      font-size: $fontSizeSmallX;
      text-align: center;
      img {
        width: pxToRem(56px);
        height: pxToRem(56px);
      }
    }
  }
}
</style>
