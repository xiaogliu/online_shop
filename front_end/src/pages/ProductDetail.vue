<template>
  <section class="product-detail">
    <header>
      <p @click="goBack"><img src="../assets/img/back.svg" alt=""></p>
    </header>
    <article class="swiper">
      <swiper v-if="product.banner.length" :autoPlay=false :swiperHeight=750>
        <div class="page" v-for="item in product.banner" :key="item.id">
          <img :src="item" alt="首页消息">
        </div>
      </swiper>
    </article>
    <article class="p-intro">
      <p class="description">{{ utils.limitStringLength('印度神油 你值得拥有值得拥有值得拥有值得拥有值得拥有值得拥有印度神油 你值得拥有值得拥有值得拥有值得拥有值得拥有值得拥有印度神油 你值得拥有值得拥有值得拥有值得拥有值得拥有值得拥有', 40) }}</p>
      <div class="price-container">
        <p class="price" v-html="utils.formatMoney(1999)"></p>
        <div>
          <span>购买数量</span>
          <div class="choose-count">
            <button @click="changeCount">-</button>
            <input type="text" value="1" v-model="buyCount" readonly>
            <button @click="changeCount('add')">+</button>
          </div>
        </div>
      </div>
    </article>
    <article class="shop">
      <p class="description">这里是店铺介绍</p>
    </article>
    <article class="p-detail-intro">
      <p class="description">这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情这里是详情</p>
    </article>
    <footer>
      <div>
        <img src="../assets/img/pd/shop_light.svg" alt="好货推荐">
        <p>进入店铺</p>
      </div>
      <button>
        立即购买
      </button>
      <button>
        加入购物车
      </button>
    </footer>
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
        addCart: null,
      },
      routeParams: {},
      product: {
        banner: ['/pd1.jpg', '/pd2.jpg', '/pd3.jpg', '/pd4.jpg'],
      },
      imgSrc: {
        coin: require('../assets/img/pd/pd1.jpg'),
        coin2: require('../assets/img/pd/pd2.jpg'),
        coin3: require('../assets/img/pd/pd3.jpg'),
        coin4: require('../assets/img/pd/pd4.jpg'),
      },
      utils: {},
      buyCount: 1,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goPage(page) {
      this.$router.push(page);
    },
    changeCount(type) {
      if (type === 'add') {
        this.buyCount += 1;
      } else if (this.buyCount > 1){
        this.buyCount -= 1;
      } else {
        Toast('至少选择一件');
      }
    },
    async addCart() {
      console.log('加入购物车');
    },
  },
  created() {
    this.utils = utils;
    utils.changeImgSrc(this.imgSrc);
    this.processMethods.addCart = utils.throttle(this.addCart, this, 2000);
    this.routeParams = this.$route.params;
  },
  mounted() {},
};
</script>

<style lang="scss">
.product-detail {
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  // BFC
  overflow: hidden;
  header {
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
  }
  .swiper {
    width: 100vw;
    height: pxToRem(750px);
    border-top: 1px solid $fontColorPlaceholder;
    border-bottom: 1px solid $fontColorPlaceholder;
    #swiper .nav p span {
      background-color: rgba(0, 0, 0, 0.2);
    }
    #swiper .nav p.active span {
      background-color: $colorMain;
    }
  }
  .p-intro {
    padding: pxToRem(16px) pxToRem(20px);
    background-color: #ffffff;
    p.description {
      font-size: $fontSizeLarge;
    }
    .price-container {
      display: flex;
      align-items: center;
      height: pxToRem(90px);
      p.price {
        flex: 1;
        font-size: $fontSizeLarge;
        color: $colorMain;
        font-weight: 600;
        span {
          font-size: $fontSizeSmall;
        }
      }
      & > div {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 100%;
        flex: 2;
        span {
          color: $fontColorAssist;
        }
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
  .shop {
    padding: pxToRem(16px) pxToRem(20px);
    margin: pxToRem(20px) 0;
    background-color: #ffffff;
  }
  .p-detail-intro {
    padding: pxToRem(16px) pxToRem(20px);
    margin-bottom: pxToRem(100px);
    background-color: #ffffff;
  }
  footer {
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    width: 100vw;
    height: pxToRem(100px);
    border-top: 1px solid $fontColorPlaceholder;
    background-color: rgba(255, 255, 255, 0.95);
    & > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      img {
        width: pxToRem(80px);
        height: pxToRem(80px);
      }
      p {
        color: $fontColorPlaceholder;
        font-size: $fontSizeSmallX;
      }
    }
    button:first-of-type {
      flex: 1;
      background-color: $colorAssist;
      color: #fff;
    }
    button:last-child {
      flex: 1;
      background-color: $colorMain;
      color: #ffffff;
    }
  }
}
</style>
