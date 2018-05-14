import ajax from './ajax';

export default {
  /**
   * 获取验证码图片
   * @returns {AxiosPromise}
   */
  //  登录
  login(bodyPar) {
    return ajax('POST', '/login', { bodyParams: bodyPar });
  },
};
