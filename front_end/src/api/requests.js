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
};
