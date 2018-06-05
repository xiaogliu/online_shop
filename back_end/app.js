const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
// const cors = require('@koa/cors');
const routes = require('./routes');

const app = new Koa();

// log request URL:
// app.use(async (ctx, next) => {
//   console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
//   await next();
// });

// parse request body:
app.use(bodyParser());

// allow 跨域请求，通过 nginx 设置反向代理，不需要设置跨域
// app.use(cors());

// add routes:
app.use(routes.routes());

app.listen(3000);
console.log('app started at port 3000...');
