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

    // 返回的是数据，如果匹配内容，数组长度不为 1
    const searchPhone = await query('SELECT email FROM user WHERE email = ?', [
      data.email,
    ]);

    const searchUsername = await query(
      'SELECT username FROM user WHERE username = ?',
      [data.username],
    );

    if (!searchPhone.length && !searchUsername.length) {
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
    } else if (searchPhone.length) {
      throw new Error('该邮箱已注册');
    } else {
      throw new Error('该用户名已注册');
    }
  } catch (e) {
    console.log('[/signup] error:', e.message, e.stack);
    ctx.status = 400;
    ctx.body = {
      msg: e.message,
    };
  }
};
