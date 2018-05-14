export default {
  /**
   * 格式化数字金额用逗号隔开保留两位小数
   * @param s input; n
   */
  formatMoney(s, n) {
    n = n >= 0 && n <= 20 ? n : 2;
    s = `${parseFloat(`${s}`.replace(/[^\d\.-]/g, '')).toFixed(n)}`;
    const l = s
      .split('.')[0]
      .split('')
      .reverse();
    const r = s.split('.')[1];
    let t = '';
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? ',' : '');
    }
    return `${t
      .split('')
      .reverse()
      .join('')}.${r}`;
  },
  /**
   * 转换时间时间戳
   * @param ts 时间戳，单位为秒
   * @param supreme，当传入true时，显示时分秒，传入false时，不显示时分秒，默认显示
   */
  timeShiftFormat(ts, supreme = true, redPacket = false) {
    if (ts) {
      // 如果是两位数的时分,前面加个0
      const formatNumber = num => {
        let numb = num;
        if (numb < 10) {
          numb = `0${numb}`;
        }
        return numb;
      };
      const d = new Date(ts * 1000);
      const year = d.getFullYear();
      const month = formatNumber(d.getMonth() + 1);
      const date = formatNumber(d.getDate());
      const hour = formatNumber(d.getHours());
      const minute = formatNumber(d.getMinutes());
      const seconds = formatNumber(d.getSeconds());
      let s = '';
      if (supreme) {
        // 带有时分秒
        s = `${year}-${month}-${date} ${hour}:${minute}:${seconds}`;
      } else if (redPacket) {
        // 点为分隔符
        s = `${year}.${month}.${date}`;
      } else {
        // 中划线为分隔符
        s = `${year}-${month}-${date}`;
      }
      return s;
    }
    return '--';
  },
  /**
   * 检测手机号
   * 规则：必须是数字
   * @param str 输入
   */
  checkNumber(str) {
    // return parseInt(str + '1', 0) == str + '1';
    const reg = /^[0-9]*$/;
    return reg.test(str);
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
  /**
   * 检测姓名
   * 规则：中文
   * @param value 输入
   */
  checkNameCN(value) {
    const reg = /^[\u4e00-\u9fa5]*$/;
    return reg.test(value);
  },
  checkNameEN(value) {
    const reg = /^[A-Za-z]*$/;
    return reg.test(value);
  },
  /**
   * 检测邮箱
   * 规则：中文
   * @param value 输入
   */
  checkEmail(value) {
    const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    return reg.test(value);
  },
  /**
   * 最多小数点后两位数判断
   * @param value 输入
   */
  checkTwoDecimal(value) {
    const reg = /^[0-9]+(.[0-9]{1,2})?$/;
    return reg.test(value);
  },
};
