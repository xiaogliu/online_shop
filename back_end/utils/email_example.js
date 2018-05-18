const nodemailer = require('nodemailer');

// 邮箱配置
const config = {
  host: 'smtp.163.com',
  port: 25,
  auth: {
    user: 'online_shop@163.com',
    // 在这里替换邮箱授权码，不是登录登录密码
    pass: 'xxxx',
  },
};

// 创建客户端
const transporter = nodemailer.createTransport(config);

// 发送邮件
module.exports = function(mail) {
  transporter.sendMail(mail, (error, info) => {
    if (error) {
      // throw new Error(error.response);
      // console.log(error.response);
      return 'false';
    }
    console.log('mail sent:', info.response);
    return true;
  });
}
