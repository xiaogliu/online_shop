import axios from './axios';

export default {
  // 登录
  login(bodyPar) {
    return axios('PUT', '/api/login', { bodyParams: bodyPar });
  },
  // 注册
  signup(bodyPar) {
    return axios('POST', '/api/signup', { bodyParams: bodyPar });
  },
  // 重置密码
  resetPwd(bodyPar) {
    return axios('PUT', '/api/resetPwd', { bodyParams: bodyPar });
  },
  // 获取邮箱验证码
  sendCaptcha(bodyPar) {
    return axios('POST', '/api/sendCaptcha', { bodyParams: bodyPar });
  },
  // 获取swiper信息
  // swiper 获取 swiper 图片，main 获取中间产品列表，bottom 获取底部产品列表
  getHomeInfo(urlPar) {
    return axios('GET', '/api/swiper', { urlParams: urlPar });
  },
};
