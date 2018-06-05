const bluebird = require('bluebird');
const connectionModel = require('../models/connection');
const sendMail = require('../utils/email');

// 发送验证码，注册页、修改密码页
module.exports = async ctx => {
  try {
    const data = ctx.request.body;
    const connection = connectionModel.getConnection();
    const query = bluebird.promisify(connection.execute.bind(connection));

    // 检测邮箱是否注册
    const searchEmail = await query('SELECT email FROM user WHERE email = ?', [
      data.email,
    ]);
    if (data.action === 'signup' && searchEmail.length) {
      throw new Error('该邮箱已注册');
    } else if (data.action === 'resetPwd' && !searchEmail.length) {
      throw new Error('该邮箱未注册');
    }

    // 6位随机数字字符串
    const captcha = Math.random()
      .toFixed(4)
      .slice(2);

    // 邮件内容
    const mail = {
      from: '小瓶商城 <online_shop@163.com>',
      subject: '小瓶商城注册验证码-测试',
      to: data.email,
      text: `您好，您正在注册小瓶商城（www.happyshopping.com），注册验证码为：${captcha}`,
    };

    // 发送邮件
    await sendMail(mail);

    // 把发送的验证码写入数据库 captcha 表
    await query(
      `INSERT INTO captcha(
        captcha,
        email
      ) VALUES(
        '${captcha}',
        ?
      )`,
      [data.email],
    );

    ctx.body = {
      status: 0,
      data: {
        msg: 'success',
      },
    };
  } catch (e) {
    console.log('[/sendCaptcha] error:', e.message, e.stack);
    ctx.status = 400;
    ctx.body = {
      msg: e.message,
    };
  }
};
