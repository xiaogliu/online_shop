const bluebird = require('bluebird');
const nodemailer = require('nodemailer');

// 邮箱配置
const config = {
  host: 'smtp.163.com',
  port: 25,
  auth: {
    user: 'online_shop@163.com',
    // 邮件授权码，不是登录密码
    pass: 'xxx',
  },
};

// 创建客户端
const transporter = nodemailer.createTransport(config);

// 发送邮件，为了在 async 函数中使用，封装为了 promise
module.exports = function(mail) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mail, (err, data) => {
      try {
        if (!err) {
          resolve(data.response);
        } else {
          // 通过内建 Error 对象抛出错误
          reject(new Error(err.response));
        }
      } catch (e) {
        console.log(e);
      }
    });
  });
};
