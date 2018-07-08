<template>
  <section class="cart">
    <header>
      <p @click="goBack"><img src="../../assets/img/back.svg" alt=""></p>
      <h2>购物车</h2>
    </header>
    <section class="cart-items-container">
      <div class="cart-item" v-for="item in cartArr" :key="item.id">
        <span>{{ item.id }}</span>
        <div class="main-info">
          <img :src="item.img_url" alt="产品图片">
          <div class="text-dis">
            <p>{{ item.title }}</p>
            <div class="choose-count">
              <button @click="changeCount">-</button>
              <input type="text" value="1" v-model="buyCount" readonly>
              <button @click="changeCount('add')">+</button>
            </div>
          </div>
          <div class="price-op">22</div>
        </div>
      </div>
    </section>
    <footer>
      <div class="checkbox">
        <input type="checkbox" id="chooseAll">
        <label for="chooseAll">全选</label>
      </div>
      <div>
        <p>合计：$ 1999</p>
      </div>
      <button>
        去结算
      </button>
    </footer>
  </section>
</template>

<script>
import requests from '../../api/requests';
import utils from '../../assets/js/utils';
import Toast from '../../components/Toast/index';
import Loading from '../../components/Loading/index';

export default {
  data() {
    return {
      cartArr: [],
      buyCount: 1,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    changeCount(type) {
      if (type === 'add') {
        this.buyCount += 1;
      } else if (this.buyCount > 1) {
        this.buyCount -= 1;
      } else {
        Toast('至少选择一件');
      }
    },
    async getCartInfo() {
      try {
        Loading.open();
        const urlPar = {
          type: 'bottom',
        };
        const res = await requests.getHomeInfo(urlPar);
        this.cartArr = res.data.data;
        Loading.close();
      } catch (e) {
        Toast(e.response.data.msg);
        Loading.close();
      }
    },
  },
  created() {
    if (!this.$store.state.userInfo.uid) {
      Toast('请先登录');
      this.$router.push({
        name: 'login',
        params: {
          from: 'home/cart',
        },
      });
    }
  },
  mounted() {
    this.getCartInfo();
  },
};
</script>

<style lang="scss">
.cart {
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  header {
    position: relative;
    height: pxToRem(90px);
    line-height: pxToRem(90px);
    background-color: #ffffff;
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
    h2 {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      font-size: $fontSizeLarge;
      font-weight: 400;
    }
  }
  section.cart-items-container {
    margin: pxToRem(20px) 0 pxToRem(120px);
    .cart-item {
      display: flex;
      background-color: #ffffff;
      span {
        width: pxToRem(60px);
      }
      .main-info {
        display: flex;
        flex: 1;
        padding: pxToRem(20px) 0;
        border-bottom: 3px solid $bgColor;
        img {
          width: pxToRem(150px);
          height: pxToRem(150px);
        }
        .text-dis {
          .choose-count {
            display: flex;
            margin: 0 pxToRem(20px);
            border: 1px solid $fontColorPlaceholder;
            button {
              width: pxToRem(80px);
              height: pxToRem(60px);
              background-color: #ffffff;
            }
            button:first-of-type {
              border-right: 1px solid $fontColorPlaceholder;
            }
            button:last-of-type {
              border-left: 1px solid $fontColorPlaceholder;
            }
            input {
              width: pxToRem(130px);
              text-align: center;
            }
          }
        }
      }
    }
  }
  footer {
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    width: 100vw;
    height: pxToRem(100px);
    border-top: 1px solid $fontColorPlaceholder;
    background-color: #ffffff;
    z-index: 9999;
    div {
      display: flex;
      align-items: center;
      height: 100%;
      p,
      label {
        font-size: $fontSizeLarge;
      }
      &.checkbox {
        justify-content: center;
        width: pxToRem(200px);
      }
      @include checkbox('../../assets/img/checked.png');
      &:last-of-type {
        width: pxToRem(300px);
      }
    }
    button {
      flex: 1;
      height: 100%;
      background-color: $colorMain;
      color: #ffffff;
      font-size: $fontSizeLarge;
    }
  }
}
</style>
