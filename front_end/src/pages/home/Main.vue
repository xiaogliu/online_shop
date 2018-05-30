<template>
  <div class="main">
    <slider>
      <div class="page" v-for="item in recommends" :key="item.id">
        <a :href="item.linkUrl">
          <img :src="item.picUrl" alt="首页消息">
        </a>
      </div>
    </slider>
    <div class="badge">
      <div>
        <img src="../../assets/img/favor.svg" alt="好货推荐">
        <p>好货推荐</p>
      </div>
      <div>
        <img src="../../assets/img/redpacket.svg" alt="领取红包">
        <p>领取红包</p>
      </div>
      <div>
        <img src="../../assets/img/shop.svg" alt="精品店铺">
        <p>精品店铺</p>
      </div>
      <div>
        <img src="../../assets/img/discount.svg" alt="限时折扣">
        <p>限时折扣</p>
      </div>
    </div>
    <div class="home-product">
      <!-- 广告商品 -->
      <div class="left">
        <div class="text">
          <h2>印度神油</h2>
          <p>印度神油 印度神油</p>
          <p>印度神油 印度神油</p>
        </div>
        <div class="img">
          <img src="../../assets/img/india.jpg" alt="印度神油">
        </div>
      </div>
      <div class="right">
        <div class="top">
          <div class="text">
            <h2>印度神油</h2>
            <p>印度神油 印度神油</p>
          </div>
          <div class="img">
            <img src="../../assets/img/india.jpg" alt="印度神油">
          </div>
        </div>
        <div class="bottom">
          <div class="text">
            <h2>印度神油</h2>
            <p>印度神油 印度神油</p>
          </div>
          <div class="img">
            <img src="../../assets/img/india.jpg" alt="印度神油">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import requests from '../lib/requests';
// import utils from '../lib/utils';

export default {
  name: 'main',
  data() {
    return {
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
  .home-product {
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
      .top, .bottom {
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
}
</style>
