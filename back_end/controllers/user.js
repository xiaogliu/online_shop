const bluebird = require('bluebird');
const connectionModel = require('../models/connection');

// 登录
exports.login = async ctx => {
  try {
    const data = ctx.request.body;
    const connection = connectionModel.getConnection();
    const query = bluebird.promisify(connection.execute.bind(connection));

    const results = await query(
      'SELECT email, password FROM user WHERE email = ? AND password = ?',
      [data.email, data.password],
    );

    if (results.length) {
      const user = results[0];

      // login success, set cookies
      ctx.cookies.set('userID', user.id, {
        httpOnly: false,
      });

      ctx.body = {
        status: 0,
        data: {
          id: user.id,
          email: user.email,
        },
      };
    } else {
      throw new Error('邮箱或密码错误');
    }
    connection.end();
  } catch (e) {
    console.log('[/login] error:', e.message, e.stack);
    ctx.status = 401;
    ctx.body = {
      msg: e.message,
    };
  }
};

// 注册
exports.signup = async ctx => {
  try {
    const data = ctx.request.body;
    const connection = connectionModel.getConnection();
    const query = bluebird.promisify(connection.execute.bind(connection));

    // 判断用户名是否注册
    const searchUsername = await query(
      'SELECT username FROM user WHERE username = ?',
      [data.username],
    );
    if (searchUsername.length) {
      throw new Error('该用户名已注册');
    }

    // 检测邮箱是否注册
    const searchEmail = await query('SELECT email FROM user WHERE email = ?', [
      data.email,
    ]);
    if (searchEmail.length) {
      throw new Error('该邮箱已注册');
    }

    // 判断验证码是否有效：获取发送的验证码，最近一条 30 分钟内为有效验证码
    const searchCaptcha = await query(
      'SELECT captcha, email, UNIX_TIMESTAMP(createdAt) FROM captcha WHERE email = ?',
      [data.email],
    );
    if (!searchCaptcha.length) {
      throw new Error('验证码有误');
    }
    const compare = property => (obj1, obj2) => {
      const v1 = obj1[property];
      const v2 = obj2[property];
      // 升序
      return v1 - v2;
    };
    searchCaptcha.sort(compare('UNIX_TIMESTAMP(createdAt)'));
    const lastCaptcha = searchCaptcha[searchCaptcha.length - 1];
    const now = parseInt(new Date().getTime() / 1000, 10);
    // 数据校验
    if (now - lastCaptcha['UNIX_TIMESTAMP(createdAt)'] > 60 * 30) {
      throw new Error('验证码过期，请重新获取');
    } else if (
      lastCaptcha.captcha !== data.captcha ||
      lastCaptcha.email !== data.email
    ) {
      throw new Error('验证码有误');
    }

    // 新用户写入数据库
    await query(
      `INSERT INTO user(
        username,
        email,
        password,
        createdAt
      ) VALUES(
        '${data.username}',
        '${data.email}',
        '${data.password}',
        ${connection.escape(new Date())}
      )`,
    );
    ctx.body = {
      status: 0,
      data: {
        msg: '注册成功',
      },
    };
  } catch (e) {
    console.log('[/signup] error:', e.message, e.stack);
    ctx.status = 400;
    ctx.body = {
      msg: e.message,
    };
  }
};
