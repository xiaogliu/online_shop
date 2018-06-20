<template>
  <section class="login">
    <header>
      <p @click="goBack"><img src="../assets/img/back.svg" alt=""></p>
    </header>
    <article>
      <!-- <img class='gtb' src="../assets/img/coin.png" alt="gtb" @click="goPage('./home')"> -->
      <img class='logo' :src="imgSrc.coin" alt="小瓶商城" @click="goPage('./home')">
      <div class="welcome">
        <p>欢迎登录</p>
      </div>
      <div class="pw">
        <input type="text" v-model='email' placeholder="请输入注册邮箱">
      </div>
      <div class="pw">
        <input type="password" maxlength="18" v-model='password' placeholder="请输入登录密码">
      </div>
      <div class="button-login">
        <button @click="processMethods.login">登录</button>
        <p>
          <router-link to="./resetPwd">忘记密码？</router-link>
          <router-link to="./signup">立即注册</router-link>
        </p>
      </div>
    </article>
  </section>
</template>

<script>
import requests from '../api/requests';
import utils from '../assets/js/utils';
import Toast from '../components/Toast/index';
import Loading from '../components/Loading/index';

export default {
  name: 'AccountantAccount',
  data() {
    return {
      email: '',
      password: '',
      processMethods: {
        login: null,
      },
      imgSrc: {
        coin: require('../assets/img/coin.png'),
        coin3x: require('../assets/img/coin@3x.png'),
      },
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goPage(page) {
      this.$router.push(page);
    },
    async login() {
      try {
        if (!this.email || !this.password) {
          Toast('您填写的信息不完整');
        } else {
          const bodyPar = {
            email: this.email,
            password: this.password,
          };
          Loading.open();
          const res = await requests.login(bodyPar);
          this.$store.commit('updateUserInfo', res.data.data);
          this.$router.push('home/people');
          Loading.close();
          Toast('登录成功');
        }
      } catch (e) {
        Loading.close();
        Toast(e.response.data.msg);
      }
    },
  },
  created() {
    utils.changeImgSrc(this.imgSrc);
    this.processMethods.login = utils.throttle(this.login, this, 2000);
  },
  mounted() {
    // utils.changeImgSrc(this.imgSrc);
    // utils.changeImgSrc();
    // this.imgSrc.coin = require('../assets/img/coin@3x.png');
  },
};
</script>

<style lang="scss">
.login {
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  padding: 0 pxToRem(20px);
  // background: 100% / contain;
  // @include bgImageResize('../assets/img/login_bg', 'jpg');
  //
  header {
    height: pxToRem(90px);
    line-height: pxToRem(90px);
    p {
      width: pxToRem(90px);
      height: pxToRem(90px);
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        width: pxToRem(60px);
        height: pxToRem(60px);
      }
    }
  }

  .logo {
    width: pxToRem(149px);
    height: pxToRem(149px);
    position: absolute;
    left: 50%;
    margin-left: pxToRem(-149px / 2);
    top: pxToRem(140px);
  }
  .button-login,
  .pw,
  .welcome {
    width: 100%;
    text-align: center;
  }
  input::placeholder {
    color: $fontColorPlaceholder;
  }
  .welcome {
    padding: pxToRem(230px) 0 pxToRem(30px);
    p {
      font-size: pxToRem(40px);
      color: $fontColorMain;
    }
  }
  .pw {
    width: pxToRem(600px);
    margin: 0 auto;
    margin: pxToRem(50px) auto;
    input {
      box-sizing: border-box;
      width: pxToRem(600px);
      height: pxToRem(81px);
      line-height: pxToRem(81px);
      font-size: $fontSizeMain;
      padding-left: pxToRem(20px);
    }
  }
  .button-login {
    width: pxToRem(600px);
    margin-top: pxToRem(60px);
    margin: 0 auto;
    button {
      width: 100%;
      height: pxToRem(90px);
      line-height: pxToRem(90px);
      margin: 0 auto;
      color: #ffffff;
      font-size: $fontSizeLargeX;
      background-color: $colorMain;
    }
    p {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: pxToRem(60px);
      font-size: $fontSizeSmall;
      a {
        color: $fontColorAssist;
      }
    }
  }
}
</style>
