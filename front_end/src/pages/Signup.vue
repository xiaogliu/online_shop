<template>
  <div class="signup">
    <div class="go-home">
      <button @click="goPage('./login')">登录</button>
    </div>
    <div class="welcome">
      <p>注册账号</p>
    </div>
    <div class="phone">
      <select v-model='phoneCountrySelected' class='phone-country'>
        <option v-for="(item, index) in phoneCountryCode" :value="item.code" :key="index">{{item.zh}}（+ {{item.code}}）</option>
      </select>
      <input type="text" v-model='phoneNumber' placeholder="请输入手机号">
    </div>
    <div class="verify-code">
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
    </div>
    <div class="pw">
      <input type="password" maxlength="18" v-model='loginPwd' placeholder="请设置6～18位登录密码">
    </div>
    <div class="pw trade-pw">
      <input type="password" maxlength="18" v-model='tradePwd' placeholder="请设置6～18位交易密码">
    </div>
    <div class="pw invite-code">
      <input type="text" v-model='inviteCode' placeholder="邀请码（选填）">
      <p>有上级邀请人的填写上级邀请人的邀请码，否则影响GTB的正常交易流程。若无填写邀请码则自动归属集团。</p>
    </div>
    <div class="pw phone-verify-code">
      <input v-model="phoneVerifyCode" class="input-phone-verify" type="text" maxlength="4" placeholder="请输入手机验证码">
      <button :disabled="isGrey" class="btn-get-phone-v" @click="getPhoneVerify">{{ phoneVerifyStatus }}</button>
    </div>
    <div class="button-login">
      <button @click="signup">注册</button>
    </div>
    <!-- <div class="button-signup">
      <button @click="goPage('./login')">去登录>></button>
    </div> -->
  </div>
</template>

<script>
import requests from '../lib/requests';
import phoneCountry from '../lib/phoneCountry';
import { Toast } from 'mint-ui';
import Utils from '../lib/utils';

export default {
  name: 'AccountantAccount',
  data() {
    return {
      isLogin: false,
      verifyImgLoading: true,
      verifyImgBase64: '',
      vertificationUID: '',
      phoneCountryCode: phoneCountry,
      phoneVerifyStatus: '获取手机验证码',
      isGrey: false,
      phoneNumber: '',
      imgVerifyCode: '',
      loginPwd: '',
      tradePwd: '',
      inviteCode: '',
      phoneVerifyCode: '',
      phoneCountrySelected: '86',
      errorMsg: '',
      isHaveError: false,
    };
  },
  methods: {
    countDown() {
      for (let i = 0; i <= 60; i++) {
        setTimeout(() => {
          if (i === 60) {
            this.phoneVerifyStatus = '获取验证码';
            this.isGrey = false;
          } else {
            const t = `${Number(60 - i)}s`;
            this.phoneVerifyStatus = t;
          }
        }, i * 1000);
      }
    },
    async getPhoneVerify() {
      this.isGrey = true;
      try {
        if (!this.phoneCountryCode || !this.phoneNumber) {
          Toast({
            message: '请输入电话号码',
            position: 'middle',
            duration: 1500,
          });
          return;
          if (!Utils.checkNumber(this.phoneNumber)) {
            Toast({
              message: '请输入正确的手机号',
              positon: 'middle',
              duration: 1500,
            });
          }
        }
        const bodyPar = {
          phone: this.phoneNumber,
          country_code: this.phoneCountrySelected,
        };
        await requests.getPhoneVerifyCode(bodyPar);
        Toast({
          message: '获取验证码成功，请在手机查看',
          position: 'middle',
          duration: 1500,
        });
        this.countDown();
      } catch (e) {
        this.isGrey = false;
        Toast({
          message: e.response.data.msg,
          position: 'middle',
          duration: 1500,
        });
      }
    },
    async getVerifyImg() {
      try {
        const verifyTimer = setTimeout(() => {
          this.verifyImgLoading = true;
        }, 1000);
        const res = await requests.getPicVerifyCode();
        // 如果接口1s中之内无法返回显示loading
        if (verifyTimer) {
          clearTimeout(verifyTimer);
        }
        const base64Length = res.data.buff.length;
        const base64Coding = `data:image/gif;base64,${res.data.buff.slice(2, base64Length - 1)}`;
        this.verifyImgBase64 = base64Coding;
        this.vertificationUID = res.data.uuid;
        this.verifyImgLoading = false;
      } catch (e) {
        Toast({
          message: e.response.data.msg,
          duration: 2000,
        });
      }
    },
    async signup() {
      try {
        // 信息校验
        if (!this.phoneNumber || !this.imgVerifyCode || !this.loginPwd || !this.tradePwd || !this.phoneVerifyCode) {
          Toast({
            message: '您填写的信息不完整',
            position: 'middle',
            duration: 1500,
          });
          return;
        }
        // 手机号校验
        if (!Utils.checkNumber(this.phoneNumber)) {
          Toast({
            message: '请输入正确的手机号',
            position: 'middle',
            duration: 1500,
          });
          return;
        }
        // 密码校验
        if (!Utils.checkPwd(this.tradePwd) || !Utils.checkPwd(this.loginPwd)) {
          Toast({
            message: '密码为6~18位数字、字母或下划线组合',
            position: 'middle',
            duration: 1500,
          });
          return;
        }
        let bodyPar = {};
        if (this.inviteCode === '') {
          bodyPar = {
            action: 'user_register',
            verification_uid: this.vertificationUID,
            answer: this.imgVerifyCode,
            captcha: this.phoneVerifyCode,
            phone: this.phoneNumber,
            country_code: this.phoneCountrySelected,
            login_password: this.loginPwd,
            transaction_password: this.tradePwd,
          };
        } else {
          bodyPar = {
            action: 'user_register',
            verification_uid: this.vertificationUID,
            answer: this.imgVerifyCode,
            captcha: this.phoneVerifyCode,
            phone: this.phoneNumber,
            country_code: this.phoneCountrySelected,
            login_password: this.loginPwd,
            transaction_password: this.tradePwd,
            inviter_code: this.inviteCode,
          };
        }
        await requests.signUp(bodyPar);
        Toast({
          message: '恭喜您，注册成功',
          position: 'middle',
          duration: 1000,
        });
        setTimeout(() => {
          this.$router.push('./login');
        }, 1000);
      } catch (e) {
        Toast({
          message: e.response.data.msg,
          position: 'middle',
          duration: 1500,
        });
      }
    },
    goPage(page) {
      this.$router.push(page);
    },
  },
  mounted() {
    this.getVerifyImg();
  },
};
</script>

<style lang="scss" scoped>
.signup {
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  padding-bottom: pxToRem(50px);
  background: url('../assets/img/login_bg.jpg') 100% / contain;
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
    padding: pxToRem(130px) 0 pxToRem(50px);
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
    margin: pxToRem(40px) auto;
    input {
      padding-left: pxToRem(20px);
    }
  }
  .invite-code {
    margin-bottom: pxToRem(20px);
    p {
      font-size: pxToRem(18px);
      margin-top: pxToRem(10px);
      color: #ffda44;
      text-align: left;
    }
  }
  .verify-code {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: pxToRem(40px) auto;
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
  .phone-verify-code {
    width: pxToRem(600px);
    height: pxToRem(81px);
    margin-bottom: pxToRem(40px);
    margin-top: 0;
    display: flex;
    justify-content: space-between;
    .input-phone-verify {
      width: pxToRem(320px);
      // padding-right: pxToRem(px);
    }
    .btn-get-phone-v {
      width: pxToRem(240px);
      height: pxToRem(81px);
      border: 0;
      outline: none;
      background-color: #ffda44;
      font-size: pxToRem(28px);
      color: #007480;
      &:disabled {
        background-color: #ddd;
        color: #fff;
      }
    }
  }
  .button-login {
    margin-top: pxToRem(50px);
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
    margin-top: pxToRem(40px);
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
