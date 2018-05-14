<template>
  <div class="login">
    <div class="go-home">
      <button @click="goPage('./signup')">注册</button>
    </div>
    <img class='gtb' src="../assets/img/coin.png" alt="gtb">
    <div class="welcome">
      <p>欢迎登录</p>
    </div>
    <div class="phone">
      <select v-model='phoneCountrySelected' class='phone-country'>
        <option v-for="(item, index) in phoneCountryCode" :value="item.code" :key="index">{{item.zh}}（+ {{item.code}}）</option>
      </select>
      <input type="text" v-model='username' placeholder="请输入用户名">
    </div>
    <div class="pw">
      <input type="password" maxlength="18" v-model='password' placeholder="请输入登录密码">
    </div>
    <!-- <div class="verify-code">
      <input type="text" maxlength="4" v-model='imgVerifyCode' placeholder="请输入验证码">
      <div class="spinner" v-show="verifyImgLoading">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
      </div>
      <img :src="verifyImgBase64" alt="验证码图片" v-show="!verifyImgLoading">
      <img class="updateImg" src="../assets/img/refresh.png" @click="getVerifyImg">
    </div> -->
    <div class="button-login">
      <button @click="login">登录</button>
    </div>
  </div>
</template>

<script>
import requests from '../lib/requests';
import phoneCountry from '../lib/phoneCountry';

export default {
  name: 'AccountantAccount',
  data() {
    return {
      phoneCountryCode: phoneCountry,
      phoneCountrySelected: '86',
      username: '',
      password: '',
    };
  },
  methods: {
    async getVerifyImg() {
      // try {
      //   const verifyTimer = setTimeout(() => {
      //     this.verifyImgLoading = true;
      //   }, 1000);
      //   const res = await requests.getPicVerifyCode();
      //   console.log(111);
      //   // 如果接口1s中之内无法返回显示loading
      //   if (verifyTimer) {
      //     clearTimeout(verifyTimer);
      //   }
      //   const base64Length = res.data.buff.length;
      //   const base64Coding = `data:image/gif;base64,${res.data.buff.slice(
      //     2,
      //     base64Length - 1,
      //   )}`;
      //   this.verifyImgBase64 = base64Coding;
      //   this.vertificationUID = res.data.uuid;
      //   this.verifyImgLoading = false;
      // } catch (e) {
      //   console.log(222);
      // }
    },
    async login() {
      try {
        const bodyPar = {
          username: this.username,
          password: this.password,
        };
        console.log(bodyPar);
        const res = await requests.login(bodyPar);
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    goPage(page) {
      this.$router.push(page);
    },
  },
  mounted() {
    // this.getVerifyImg();
  },
};
</script>

<style lang="scss" scoped>
.login {
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  // padding-bottom: pxToRem(50px);
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
  .welcome,
  .phone,
  .pw,
  .verify-code,
  .button-login,
  .button-signup {
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
  .phone,
  .pw,
  .verify-code {
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
  .phone {
    display: flex;
    .phone-country {
      width: pxToRem(100px);
      height: pxToRem(81px);
      position: absolute;
      border: 0;
      outline: none;
      background-color: #fff;
      font-size: pxToRem(28px);
    }
  }
  .pw {
    margin: pxToRem(50px) auto;
    input {
      padding-left: pxToRem(20px);
    }
  }
  .verify-code {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: pxToRem(50px) auto;
    input {
      width: pxToRem(300px);
      padding: 0 pxToRem(20px);
    }
    img {
      height: pxToRem(81px);
      margin-left: pxToRem(20px);
    }
    .updateImg {
      height: 18px;
    }
    .spinner {
      display: inline-block;
      margin: pxToRem(10px) pxToRem(10px) pxToRem(10px) 0;
      width: pxToRem(200px);
      height: pxToRem(60px);
      text-align: center;
      font-size: pxToRem(10px);
      div {
        background-color: #ddd;
        height: 100%;
        width: pxToRem(8px);
        margin: 0 pxToRem(3px);
        display: inline-block;
        animation: stretchdelay 1.2s infinite ease-in-out;
      }
      .rect2 {
        animation-delay: -1.1s;
      }
      .rect3 {
        animation-delay: -1s;
      }
      .rect4 {
        animation-delay: -0.9s;
      }
      .rect5 {
        animation-delay: -0.8s;
      }
      @keyframes stretchdelay {
        0%,
        40%,
        100% {
          transform: scaleY(0.4);
        }
        20% {
          transform: scaleY(1);
        }
      }
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
  .button-signup {
    margin-top: pxToRem(250px);
    button {
      width: pxToRem(600px);
      height: pxToRem(100px);
      line-height: pxToRem(100px);
      margin: 0 auto;
      color: #ffda44;
      font-size: pxToRem(28px);
      background-color: transparent;
    }
  }
}
</style>
