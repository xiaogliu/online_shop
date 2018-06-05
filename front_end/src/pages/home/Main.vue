<template>
  <article class="main">
    <slider>
      <div class="page" v-for="item in recommends" :key="item.id">
        <a :href="item.linkUrl">
          <img :src="item.picUrl" alt="首页消息">
        </a>
      </div>
    </slider>
    <section class="badge">
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
    </section>
    <section class="home-recommends2">
      <!-- 广告商品 -->
      <div class="left">
        <div class="text">
          <h2>印度神油</h2>
          <p>印度神油 印度神油</p>
          <p>印度神油 印度神油</p>
        </div>
        <div class="img">
          <img src="../../assets/img/india.jpg" alt="好货推荐">
        </div>
      </div>
      <div class="right">
        <div class="top">
          <div class="text">
            <h2>印度神油</h2>
            <p>印度神油 印度神油</p>
          </div>
          <div class="img">
            <img src="../../assets/img/india.jpg" alt="好货推荐">
          </div>
        </div>
        <div class="bottom">
          <div class="text">
            <h2>印度神油</h2>
            <p>印度神油 印度神油</p>
          </div>
          <div class="img">
            <img src="../../assets/img/india.jpg" alt="好货推荐">
          </div>
        </div>
      </div>
    </section>
    <section class="more-product">
      <p class="intro">
        <span>-</span>
        <span>更</span>
        <span>多</span>
        <span>好</span>
        <span>货</span>
        <span>-</span>
      </p>
      <div class="more-main">
        <div class="more-item">
          <img src="../../assets/img/india.jpg" alt="更多产品">
          <div class="item-text">
            <p>这里是介绍</p>
            <p>¥ 199.00</p>
          </div>
        </div>
        <div class="more-item">
          <img src="../../assets/img/india.jpg" alt="更多产品">
          <div class="item-text">
            <p>{{ utils.limitStringLength('这里是介绍这里是介绍这里是介绍这里是介绍这里是介绍这里是介绍这里是介绍', 25) }}</p>
            <p>¥ 199.00</p>
          </div>
        </div>
        <div class="more-item">
          <img src="../../assets/img/india.jpg" alt="更多产品">
          <div class="item-text">
            <p>这里是介绍</p>
            <p>¥ 199.00</p>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
// import requests from '../lib/requests';
import utils from '../../assets/js/utils';

export default {
  name: 'homeMain',
  data() {
    return {
      utils: null,
      recommends: [
        {
          linkUrl: 'http://oifk6rgqz.bkt.clouddn.com/1.jpg',
          picUrl: 'http://oifk6rgqz.bkt.clouddn.com/1.jpg',
          id: 0,
        },
        {
          linkUrl: 'http://oifk6rgqz.bkt.clouddn.com/2.jpg',
          picUrl: 'http://oifk6rgqz.bkt.clouddn.com/2.jpg',
          id: 1,
        },
        {
          linkUrl: 'http://oifk6rgqz.bkt.clouddn.com/3.jpg',
          picUrl: 'http://oifk6rgqz.bkt.clouddn.com/3.jpg',
          id: 2,
        },
      ],
    };
  },
  methods: {
    goPage() {
      this.$router.push('/login');
    },
  },
  created() {
    this.utils = utils;
  },
};
</script>

<style lang="scss" scoped>
.main {
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
      display: flex;
      flex-wrap: wrap;
      margin-bottom: pxToRem(100px);
      .more-item {
        box-sizing: border-box;
        width: pxToRem(370px);
        margin-bottom: pxToRem(10px);
        background-color: #fff;
        &:nth-child(even) {
          margin-left: pxToRem(5px);
        }
        &:nth-child(odd) {
          margin-right: pxToRem(5px);
        }
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
          }
        }
      }
    }
  }
}
</style>
