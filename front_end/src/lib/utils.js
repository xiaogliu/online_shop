export default {
  /**
   * 检测手机号
   * 规则：表示以1开头，第二位可能是0/3/4/5/7/8等的任意一个，在加上后面的\d表示数字[0-9]的9位，总共加起来11位结束
   * @param numb 输入
   */
  checkPhone(numb) {
    const reg = /^1(0|3|4|5|7|8)\d{9}$/;
    return reg.test(numb);
  },
  /**
   * 检测密码
   * 规则：6-18位数字、字母或下划线
   * @param pwd 输入
   */
  checkPwd(pwd) {
    const reg = /^[0-9A-Za-z_]{6,18}$/;
    return reg.test(pwd);
  },
};
