const bluebird = require('bluebird');
const connectionModel = require('../models/connection');
const sendMail = require('../utils/email');

// 发送验证码
exports.sendCaptcha = async ctx => {
  try {
    const data = ctx.request.body;
    const connection = connectionModel.getConnection();
    const query = bluebird.promisify(connection.execute.bind(connection));

    // 6位随机数字字符串
    const captcha = Math.random()
      .toFixed(4)
      .slice(2);

    // 邮件内容
    const mail = {
      from: '在线商城 <online_shop@163.com>',
      subject: '在线商城注册验证码-测试',
      to: data.email,
      text: `您好，您正在注册在线商城，注册验证码为：${captcha}`,
    };

    // 发送邮件
    await sendMail(mail);

    // 把发送的验证码写入数据库 captcha 表
    await query(
      `INSERT INTO captcha(
        captcha,
        email,
        createdAt
      ) VALUES(
        '${captcha}',
        '${data.email}',
        ${connection.escape(new Date())}
      )`,
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
