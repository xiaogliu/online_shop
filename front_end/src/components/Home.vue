<template>
  <div class="home">
    <div class="logo">
      <img src="../assets/img/coin.png" alt="GTB">
    </div>
    <div class="price">
      <p>当前价格</p>
      <p>1GTB = {{ gtcPrice / 100 }}USD</p>
    </div>
    <div class="account">
      <p>当前数量</p>
      <p>{{ utils.formatMoney(gtcNum) }}</p>
    </div>
    <div class="button">
      <!-- <button v-show="this.isLogin" @click="buy">立即购买</button> -->
      <button v-show="!this.isLogin" @click="goPage">登录/注册</button>
    </div>
  </div>
</template>

<script>
import requests from '../lib/requests';
import Utils from '../lib/utils';
import Toast from 'mint-ui';
export default {
  name: 'AccountantAccount',
  data() {
    return {
      isLogin: false,
      gtcPrice: 0,
      gtcNum: 0,
      utils: '',
    };
  },
  methods: {
    async getGTCInfo() {
      try {
        const res = await requests.getGTCPrice();
        this.gtcPrice = res.data.gtd_price;
        this.gtcNum = res.data.gtd_rem;
      } catch(e) {
        Toast({
          message: e.response.data.msg,
          duration: 2000,
        })
      }
    },
    goPage() {
      this.$router.push('/login');
    },
  },
  created() {
    this.isLogin = this.$store.state.isLogin;
    this.getGTCInfo();
    this.utils = Utils;
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  min-height: 100vh;
  background: url('../assets/img/home_bg.jpg') 100% / cover;
  .logo,
  .price,
  .account,
  .button {
    width: 100%;
    text-align: center;
  }
  .logo {
    padding: pxToRem(170px) 0 pxToRem(90px);
    img {
      width: pxToRem(150px);
    }
  }
  .price,
  .account {
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
}
</style>
