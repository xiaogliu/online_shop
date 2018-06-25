<template>
  <section class="main" @click='goPage("/product/1")'>
    <article class="swiper">
      <swiper v-if="products.swiper.length">
        <div class="page" v-for="item in products.swiper" :key="item.id">
          <!-- <a :href="item.path"> -->
          <img :src="item.img_url" alt="首页消息">
          <!-- </a> -->
        </div>
      </swiper>
    </article>
    <article class="badge">
      <div>
        <img src="../../assets/img/favor.svg" alt="好货推荐">
        <p>好货推荐</p>
      </div>
      <div>
        <img src="../../assets/img/shop.svg" alt="精品店铺">
        <p>精品店铺</p>
      </div>
      <div>
        <img src="../../assets/img/discount.svg" alt="限时折扣">
        <p>限时折扣</p>
      </div>
      <div>
        <img src="../../assets/img/about.svg" alt="领取红包">
        <p>平台介绍</p>
      </div>
    </article>
    <article class="home-recommends2">
      <!-- 广告商品 -->
      <div class="left">
        <div class="text">
          <h2>今日推荐</h2>
          <p>{{ products.main[0].title }}</p>
        </div>
        <div class="img">
          <img v-lazy="products.main[0].img_url" alt="好货推荐">
        </div>
      </div>
      <div class="right">
        <div class="top">
          <div class="text">
            <h2>精挑细选</h2>
            <p>{{ products.main[1].title }}</p>
          </div>
          <div class="img">
            <img v-lazy="products.main[1].img_url" alt="好货推荐">
          </div>
        </div>
        <div class="bottom">
          <div class="text">
            <h2>不容错过</h2>
            <p>{{ products.main[2].title }}</p>
          </div>
          <div class="img">
            <img v-lazy="products.main[2].img_url" alt="好货推荐">
          </div>
        </div>
      </div>
    </article>
    <article class="more-product">
      <p class="intro">
        <span>-</span>
        <span>更</span>
        <span>多</span>
        <span>好</span>
        <span>货</span>
        <span>-</span>
      </p>
      <div class="more-main">
        <div class="more-item" v-for="item in products.bottom" :key="item.id">
          <div class="more-item-content">
            <img v-lazy="item.img_url" alt="更多产品">
            <div class="item-text">
              <p>{{ utils.limitStringLength(item.description, 25) }}</p>
              <p v-html="utils.formatMoney(item.price)"></p>
            </div>
          </div>
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
  name: 'homeMain',
  data() {
    return {
      utils: null,
      products: {
        swiper: [],
        main: [{}, {}, {}],
        bottom: [],
      },
    };
  },
  methods: {
    goPage(path) {
      this.$router.push(path);
    },
    async getHomeProducts(type) {
      try {
        const res = await requests.getHomeInfo({
          type,
        });
        switch (type) {
          case 'swiper':
            this.products.swiper = res.data.data;
            break;
          case 'main':
            this.products.main = res.data.data;
            break;
          case 'bottom':
            this.products.bottom = res.data.data;
            Loading.close();
            break;
          default:
            break;
        }
      } catch (e) {
        Toast(e.response.data.msg);
        Loading.close();
      }
    },
  },
  async created() {
    Loading.open();
    this.utils = utils;
    this.getHomeProducts('swiper');
    this.getHomeProducts('main');
    this.getHomeProducts('bottom');
  },
};
</script>

<style lang="scss">
.main {
  .swiper {
    width: 100%;
    height: pxToRem(360px);
  }
  .badge {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: pxToRem(150px);
    background-color: #fff;
    & > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: pxToRem(80px);
        height: pxToRem(80px);
      }
      p {
        font-size: $fontSizeSmallX;
      }
    }
  }
  .home-recommends2 {
    display: flex;
    justify-content: space-between;
    margin-top: pxToRem(20px);
    height: pxToRem(600px);
    .left {
      display: flex;
      flex-direction: column;
      flex: 1;
      height: 100%;
      margin-right: pxToRem(4px);
      padding: pxToRem(20px) 0 0 pxToRem(20px);
      background-color: #fff;
      .text {
        flex: 1;
        h2 {
          font-size: $fontSizeLarge;
          font-weight: normal;
          color: #da6d6a;
        }
        p {
          font-size: $fontSizeSmallX;
          color: $fontColorAssist;
        }
      }
      .img {
        flex: 3;
        align-items: center;
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      flex: 1;
      height: 100%;
      .top,
      .bottom {
        display: flex;
        flex-direction: column;
        padding: pxToRem(20px) 0 0 pxToRem(20px);
        background-color: #fff;
        flex: 1;
        .text {
          flex: 1;
          h2 {
            font-size: $fontSizeLarge;
            font-weight: normal;
            color: #e5a452;
          }
          p {
            font-size: $fontSizeSmallX;
            color: $fontColorAssist;
          }
        }
        .img {
          display: flex;
          flex: 3;
          align-items: center;
          img {
            height: pxToRem(160px);
          }
        }
      }
      .bottom {
        margin-top: pxToRem(4px);
        .text {
          h2 {
            color: #9985ca;
          }
        }
      }
    }
  }
  .more-product {
    .intro {
      display: flex;
      justify-content: center;
      align-items: center;
      height: pxToRem(80px);
      font-size: $fontSizeLarge;
      span {
        display: inline-block;
        margin: 0 pxToRem(4px);
        &:nth-child(1),
        &:nth-child(2) {
          color: #ff5757;
        }
        &:nth-child(3) {
          color: #ff8181;
        }
        &:nth-child(4) {
          color: #ffa357;
        }
        &:nth-child(5),
        &:nth-child(6) {
          color: #ffba81;
        }
      }
    }
    .more-main {
      margin-bottom: pxToRem(100px);
      overflow: auto;
      .more-item {
        box-sizing: border-box;
        float: left;
        width: 50%;
        padding-bottom: pxToRem(10px);
        &:nth-child(even) {
          padding-left: pxToRem(5px);
        }
        &:nth-child(odd) {
          padding-right: pxToRem(5px);
        }
        .more-item-content {
          overflow: hidden;
          background-color: #fff;
          img {
            width: pxToRem(370px);
            height: pxToRem(370px);
          }
          .item-text {
            p:first-child {
              height: pxToRem(74px);
              padding: 0 pxToRem(10px);
              font-size: $fontSizeSmall;
            }
            p:last-child {
              height: pxToRem(50px);
              line-height: pxToRem(50px);
              padding: 0 pxToRem(10px);
              font-size: $fontSizeMain;
              color: $colorMain;
              span {
                font-size: $fontSizeSmall;
              }
            }
          }
        }
      }
    }
  }
}
</style>
