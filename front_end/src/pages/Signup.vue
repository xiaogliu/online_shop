<template>
  <section class="signup">
    <header>
      <p @click="goBack"><img src="../assets/img/back.svg" alt=""></p>
      <div class="go-home">
        <button @click="goPage('./login')">登录</button>
      </div>
    </header>
    <article>
      <div class="welcome">
        <p>注册账号</p>
      </div>
      <div class="pw">
        <input type="text" v-model='info.email' placeholder="请输入邮箱地址">
      </div>
      <div class="pw">
        <input type="text" v-model='info.username' placeholder="请输入用户名">
      </div>
      <div class="pw">
        <input type="password" maxlength="18" v-model='info.password' placeholder="请设置6～18位登录密码">
      </div>
      <div class="pw">
        <input type="password" maxlength="18" v-model='info.verifyPassword' placeholder="请重新输入6～18位登录密码">
      </div>
      <div class="pw email-verify-code">
        <input v-model="captcha.code" class="input-email-verify" type="text" placeholder="请输入邮箱验证码">
        <button :disabled="captcha.isGrey" class="btn-get-email-v" @click="processMethods.getCaptcha">{{ captcha.msg }}</button>
      </div>
      <div class="button-signup">
        <button @click="processMethods.signup">注册</button>
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
      info: {
        username: '',
        email: '',
        password: '',
        verifyPassword: '',
      },
      captcha: {
        isGrey: false,
        code: '',
        msg: '获取邮箱验证码',
      },
      processMethods: {
        getCaptcha: null,
        signup: null,
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
    // 点击获取邮箱验证码之后倒计时
    countDown() {
      for (let i = 0; i <= 60; i++) {
        setTimeout(() => {
          if (i === 60) {
            this.captcha.msg = '获取邮箱验证码';
            this.captcha.isGrey = false;
          } else {
            const t = `${Number(60 - i)}s`;
            this.captcha.msg = t;
          }
        }, i * 1000);
      }
    },
    // 获取邮箱验证码
    async getCaptcha() {
      try {
        if (!utils.checkEmail(this.info.email)) {
          Toast('请输入正确的邮箱地址');
        } else {
          Loading.open();
          const bodyPar = {
            action: 'signup',
            email: this.info.email,
          };
          await requests.sendCaptcha(bodyPar);
          this.captcha.isGrey = true;
          this.countDown();
          Loading.close();
          Toast('邮件发送成功，验证码30分钟内有效');
        }
      } catch (e) {
        Loading.close();
        Toast(e.response.data.msg);
      }
    },
    // 注册
    async signup() {
      try {
        // 信息校验
        if (
          !this.info.email ||
          !this.info.password ||
          !this.info.verifyPassword ||
          !this.info.username ||
          !this.captcha.code
        ) {
          Toast('您填写的信息不完整');
        } else if (!utils.checkEmail(this.info.email)) {
          Toast('请输入正确的邮箱地址');
        } else if (!utils.checkPwd(this.info.password)) {
          Toast('密码为6~18位数字、字母或下划线组合');
        } else if (this.info.password !== this.info.verifyPassword) {
          Toast('两次输入的密码不一致');
        } else {
          // 开始注册
          Loading.open();
          const bodyPar = {
            username: this.info.username,
            email: this.info.email,
            password: this.info.password,
            captcha: this.captcha.code,
          };
          await requests.signup(bodyPar);
          Loading.close();
          Toast({
            message: '恭喜您，注册成功',
            duration: 1000,
          });
          setTimeout(() => {
            this.$router.push('./login');
          }, 1000);
        }
      } catch (e) {
        Loading.close();
        Toast(e.response.data.msg);
      }
    },
  },
  created() {
    this.processMethods.getCaptcha = utils.throttle(
      this.getCaptcha,
      this,
      2000,
    );
    this.processMethods.signup = utils.throttle(this.signup, this, 2000);
  },
};
</script>

<style lang="scss">
.signup {
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  // padding: 0 pxToRem(20px);

  header {
    height: pxToRem(90px);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    p {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: pxToRem(90px);
      height: pxToRem(90px);
      img {
        width: pxToRem(60px);
        height: pxToRem(60px);
      }
    }
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
      font-size: $fontSizeMain;
    }
  }
  .welcome,
  .pw,
  .button-signup {
    width: 100%;
    text-align: center;
  }
  input::placeholder {
    color: #aaa;
  }
  .welcome {
    padding: pxToRem(100px) 0 pxToRem(50px);
    p {
      font-size: pxToRem(40px);
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
      font-size: $fontSizeMain;
      padding-left: pxToRem(100px);
    }
  }
  .pw {
    margin: pxToRem(40px) auto;
    input {
      padding-left: pxToRem(20px);
    }
  }
  .email-verify-code {
    width: pxToRem(600px);
    height: pxToRem(81px);
    margin-bottom: pxToRem(40px);
    margin-top: 0;
    display: flex;
    justify-content: space-between;
    .input-email-verify {
      width: pxToRem(320px);
      // padding-right: pxToRem(px);
    }
    .btn-get-email-v {
      width: pxToRem(240px);
      height: pxToRem(81px);
      border: 0;
      outline: none;
      background-color: $colorMain;
      font-size: $fontSizeSmall;
      color: #ffffff;
      &:disabled {
        background-color: #ddd;
        color: #ffffff;
      }
    }
  }
  .button-signup {
    margin-top: pxToRem(50px);
    button {
      width: pxToRem(600px);
      height: pxToRem(90px);
      line-height: pxToRem(90px);
      margin: 0 auto;
      color: #ffffff;
      font-size: $fontSizeLargeX;
      background-color: $colorMain;
    }
  }
}
</style>
