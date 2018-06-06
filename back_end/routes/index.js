const Router = require('koa-router');
const user = require('../controllers/user');
const sendCaptcha = require('../controllers/send_captcha');
const homeInfo = require('../controllers/home_info');

const router = new Router();

// 用户相关
router.put('/api/login', user.login);
router.post('/api/signup', user.signup);
router.put('/api/resetPwd', user.resetPwd);

// 发送验证码
router.post('/api/sendCaptcha', sendCaptcha);

// 首页推荐资源
router.get('/api/swiper', homeInfo);

module.exports = router;
