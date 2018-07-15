<template>
  <section class="people-page">
    <section class="people-top">
      <div>
        <img src="../../assets/img/avatar.png" alt="头像">
        <p>你好用户</p>
      </div>
    </section>
    <section class="people-main">
      <div class="people-main-item">
        <img src="../../assets/img/goods.png" alt="icon">
        <p>我的订单</p>
        <span class="right-arrow"></span>
      </div>
      <div class="people-main-item">
        <img src="../../assets/img/deliver.png" alt="icon">
        <p>收获地址</p>
        <span class="right-arrow"></span>
      </div>
    </section>
    <section class="people-main">
      <div class="people-main-item">
        <img src="../../assets/img/settings.png" alt="icon">
        <p>修改密码</p>
        <span class="right-arrow"></span>
      </div>
      <div class="people-main-item">
        <img src="../../assets/img/question.png" alt="icon">
        <p>帮助反馈</p>
        <span class="right-arrow"></span>
      </div>
    </section>
  </section>
</template>
<script>
import Toast from '../../components/Toast/index';

export default {
  data() {
    return {};
  },
  created() {
    if (!this.$store.state.userInfo.uid) {
      Toast('请先登录');
      this.$router.push({
        name: 'login',
        params: {
          from: 'home/people',
        },
      });
    }
  },
};
</script>
<style lang="scss">
.people-page {
  min-height: 100vh;
  .people-top {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: pxToRem(460px);
    background: linear-gradient(to right bottom, #fc9ca0, #fcd793);
    img {
      width: pxToRem(180px);
      height: pxToRem(180px);
      border-radius: 50%;
    }
    p {
      margin-top: pxToRem(10px);
      text-align: center;
      font-size: $fontSizeLarge;
      color: #fff;
    }
  }
  .people-main {
    margin-top: pxToRem(30px);
    background-color: #fff;
    div {
      display: flex;
      align-items: center;
      height: pxToRem(100px);
      padding: 0 pxToRem(20px);
      &:first-child {
        border-bottom: 1px solid $bgColor;
      }
      img {
        margin: 0 pxToRem(40px) 0 pxToRem(20px);
        width: pxToRem(50px);
        height: pxToRem(50px);
      }
      span {
        position: absolute;
        right: pxToRem(20px);
      }
      span::before,
      span::after {
        display: block;
        content: '';
        width: pxToRem(24px);
        height: pxToRem(2px);
        background-color: #333;
        margin: pxToRem(14px) 0;
      }
      span::before {
        transform: rotate(45deg);
      }
      span::after {
        transform: rotate(-45deg);
      }
    }
  }
}
</style>
