<template>
  <div class="login">
    <div class="go-home">
      <button @click="goPage('./signup')">注册</button>
    </div>
    <img class='gtb' src="../assets/img/coin.png" alt="gtb">
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
    </div>
  </div>
</template>

<script>
import requests from '../lib/requests';
import utils from '../lib/utils';
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
    };
  },
  methods: {
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
          await requests.login(bodyPar);
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
    this.processMethods.login = utils.throttle(this.login, this, 2000);
  },
};
</script>

<style lang="scss" scoped>
.login {
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  background: url('../assets/img/login_bg.jpg') 100% / contain;
  .gtb {
    width: pxToRem(149px);
    height: pxToRem(149px);
    position: absolute;
    left: 50%;
    margin-left: pxToRem(-149px / 2);
    top: pxToRem(140px);
  }
  .go-home {
    position: fixed;
    height: pxToRem(88px);
    right: 0;
    z-index: 99999;
    button {
      padding: 0 pxToRem(24px);
      height: pxToRem(88px);
      background: 0;
      font-size: pxToRem(28px);
      color: #fff;
    }
  }
  .button-login,
  .pw,
  .welcome {
    width: 100%;
    text-align: center;
  }
  input::placeholder {
    color: #aaa;
  }
  .welcome {
    padding: pxToRem(310px) 0 pxToRem(60px);
    p {
      font-size: pxToRem(40px);
      color: #fff;
    }
  }
  .pw {
    width: pxToRem(600px);
    margin: 0 auto;
    input {
      box-sizing: border-box;
      width: pxToRem(600px);
      height: pxToRem(81px);
      line-height: pxToRem(81px);
      font-size: pxToRem(28px);
      padding-left: pxToRem(100px);
    }
  }
  .pw {
    margin: pxToRem(50px) auto;
    input {
      padding-left: pxToRem(20px);
    }
  }
  .button-login {
    margin-top: pxToRem(60px);
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
