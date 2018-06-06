const bluebird = require('bluebird');
const connectionModel = require('../models/connection');

// 首页轮播图
module.exports = async ctx => {
  try {
    const data = ctx.request.query;

    // connect mysql
    const connection = connectionModel.getConnection();
    const query = bluebird.promisify(connection.execute.bind(connection));

    // 数据库查询
    let results = null;
    switch (data.type) {
      case 'swiper':
        results = await query('SELECT * FROM swiper');
        break;
      case 'main':
        results = await query('SELECT * FROM home_main_products');
        break;
      case 'bottom':
        results = await query('SELECT * FROM home_bottom_products');
        break;
      default:
        results = null;
        break;
    }
    // 返回数据
    // 这里没有必要在手动填写status，防止不受控？
    ctx.body = {
      status: 0,
      data: results,
    };
    // ctx.body = results;
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      msg: e.message,
    };
  }
};
