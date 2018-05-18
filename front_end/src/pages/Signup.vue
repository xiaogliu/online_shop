<template>
  <div class="signup">
    <div class="go-home">
      <button @click="goPage('./login')">登录</button>
    </div>
    <div class="welcome">
      <p>注册账号</p>
    </div>
    <div class="pw">
      <input type="text" v-model='phoneNumber' placeholder="请输入手机号">
    </div>
    <div class="pw">
      <input type="text" v-model='username' placeholder="请输入用户名">
    </div>
    <div class="pw">
      <input type="password" maxlength="18" v-model='loginPwd' placeholder="请设置6～18位登录密码">
    </div>
    <div class="pw trade-pw">
      <input type="password" maxlength="18" v-model='verifyLoginPwd' placeholder="请重新输入6～18位登录密码">
    </div>
    <div class="button-login">
      <button @click="signup">注册</button>
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
      username: '',
      phoneNumber: '',
      loginPwd: '',
      verifyLoginPwd: '',
    };
  },
  methods: {
    goPage(page) {
      this.$router.push(page);
    },
    async signup() {
      try {
        // 信息校验
        if (!this.phoneNumber || !this.loginPwd || !this.verifyLoginPwd || !this.username) {
          Toast('您填写的信息不完整');
        } else if (!utils.checkPhone(this.phoneNumber)) {
          Toast('请输入正确的手机号');
        } else if (!utils.checkPwd(this.loginPwd)) {
          Toast('密码为6~18位数字、字母或下划线组合');
        } else if (this.loginPwd !== this.verifyLoginPwd) {
          Toast('两次输入的密码不一致');
        } else {
          // 开始注册
          Loading.open();
          const bodyPar = {
            username: this.username,
            phone: this.phoneNumber,
            password: this.loginPwd,
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
  .pw,
  .button-login {
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
    margin: pxToRem(40px) auto;
    input {
      padding-left: pxToRem(20px);
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
}
</style>
