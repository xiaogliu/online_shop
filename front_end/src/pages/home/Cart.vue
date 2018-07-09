<template>
  <section class="cart">
    <header>
      <p @click="goBack"><img src="../../assets/img/back.svg" alt=""></p>
      <h2>购物车</h2>
    </header>
    <section class="cart-items-container">
      <div class="cart-item" v-for="item in cartArr" :key="item.id">
        <div class="checkbox">
          <input type="checkbox" :id="'cartItem' + item.id">
          <label :for="'cartItem' + item.id"></label>
        </div>
        <div class="main-info">
          <img :src="item.img_url" alt="产品图片">
          <div class="text-dis">
            <p>{{ utils.limitStringLength(item.title, 28) }}</p>
            <div class="choose-count">
              <button @click="changeCount">-</button>
              <input type="text" value="1" v-model="item.count" readonly>
              <button @click="changeCount('add')">+</button>
            </div>
          </div>
          <div class="price-op">
            <p class="price" v-html="utils.formatMoney(item.price)"></p>
            <div class="cart-delete">
              <img src="../../assets/img/delete.png" alt="删除">
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer>
      <div class="checkbox">
        <input type="checkbox" id="chooseAll">
        <label for="chooseAll">全选</label>
      </div>
      <div class="total-money">
        合计：
        <p class="price" v-html="utils.formatMoney(18888)"></p>
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
      utils: {},
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
    } else {
      this.utils = utils;
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
      .checkbox {
        width: pxToRem(80px);
        @include checkbox("../../assets/img/checked.png");
        label {
          display: block;
          width: 100%;
          height: 100%;
        }
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
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          flex: 1;
          p {
            font-size: $fontSizeSmall;
          }
          .choose-count {
            display: flex;
            width: pxToRem(280px);
            border: 1px solid $fontColorPlaceholder;
            button {
              width: pxToRem(80px);
              height: pxToRem(60px);
              line-height: pxToRem(60px);
              color: $colorMain;
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
        .price-op {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          width: pxToRem(180px);
          p.price {
            font-size: $fontSizeLarge;
            color: $colorMain;
            font-weight: 600;
            span {
              font-size: $fontSizeSmall;
            }
          }
          .cart-delete {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            width: pxToRem(90px);
            height: pxToRem(70px);
            img {
              width: pxToRem(40px);
              height: pxToRem(40px);
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
      @include checkbox("../../assets/img/checked.png");
      &:last-of-type {
        width: pxToRem(300px);
      }
    }
    .total-money {
      font-size: $fontSizeLarge;
      p.price {
        flex: 1;
        font-size: $fontSizeLargeX;
        color: $colorMain;
        font-weight: 600;
        span {
          font-size: $fontSizeSmall;
        }
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
