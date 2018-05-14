const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

const app = new Koa();

// log request URL:
// app.use(async (ctx, next) => {
//   console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
//   await next();
// });

// parse request body:
app.use(bodyParser());
// allow 跨域请求
app.use(cors());

// add routes:
const routes = ['user'];
routes.forEach((route) => {
  app.use(require(`./routes/${route}`).routes());
});


app.listen(3000);
console.log('app started at port 3000...');
