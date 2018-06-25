<template>
  <section class="all-product">
    <header>
      <input type="text" placeholder="输入关键字进行搜索">
      <button @click="processMethods.search">搜索</button>
    </header>
    <article @click='goPage("/product/1")'>
      <div class="product-item" v-for="item in products.all" :key="item.id">
        <img v-lazy="item.img_url" alt="item.title">
        <div>
          <h3>{{item.title}}</h3>
          <p class="description">{{ utils.limitStringLength(item.description, 32) }}</p>
          <p class="price" v-html="utils.formatMoney(item.price)"></p>
        </div>
      </div>
    </article>
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
      utils: null,
      processMethods: {
        search: null,
      },
      products: {
        all: null,
        search: null,
      },
    };
  },
  methods: {
    searchProduct() {
      console.log('search');
    },
    goPage(path) {
      console.log(path);
      this.$router.push(path);
    },
    async init() {
      try {
        Loading.open();
        const res = await requests.getHomeInfo({
          type: 'bottom',
        });
        this.products.all = res.data.data;
        Loading.close();
      } catch (e) {
        Loading.close();
        Toast(e.response.data.msg);
      }
    }
  },
  created() {
    this.utils = utils;
    this.processMethods.search = utils.throttle(this.searchProduct, this, 2000);
    this.init();
  },
};
</script>

<style lang="scss">
.all-product {
  header {
    height: pxToRem(88px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 pxToRem(20px);
    background-color: #ffffff;
    input {
      box-sizing: border-box;
      width: pxToRem(600px);
      height: pxToRem(60px);
      padding: 0 pxToRem(30px);
      border-radius: pxToRem(40px);
      background-color: $bgColor;
      &::placeholder {
        font-size: $fontSizeSmall;
        color: $fontColorPlaceholder;
      }
    }
    button {
      width: pxToRem(80px);
      height: pxToRem(60px);
      color: #ffffff;
      border-radius: pxToRem(6px);
      background-color: $colorMain;
    }
  }
  article {
    margin-bottom: pxToRem(96px);
    .product-item {
      display: flex;
      background-color: #ffffff;
      margin: pxToRem(3px) 0;
      img {
        width: pxToRem(240px);
        height: pxToRem(240px);
      }
      div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        height: pxToRem(240px);
        padding: pxToRem(20px);
        h3 {
          font-weight: 400;
        }
        p.description {
          font-size: $fontSizeSmall;
        }
        p.price {
          font-size: $fontSizeLarge;
          color: $colorMain;
          span {
            font-size: $fontSizeSmall;
          }
        }
      }
    }
  }
}
</style>
