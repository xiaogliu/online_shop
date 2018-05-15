const bluebird = require('bluebird');
const connectionModel = require('../models/connection');

exports.login = async (ctx) => {
  try {
    const data = ctx.request.body;
    const connection = connectionModel.getConnection();
    const query = bluebird.promisify(connection.execute.bind(connection));

    const results = await query('select * from user where username = ? and password = ?', [data.username, data.password]);

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
          name: user.username,
        },
      };
    } else {
      throw new Error('登录失败');
    }

    connection.end();
  } catch (e) {
    console.log(e.message);
    ctx.body = {
      status: e.code || -1,
      body: e.message,
    };
  }
};
