const Router = require('koa-router');
const user = require('../controllers/user');
const sendCaptcha = require('../controllers/send_captcha');

const router = new Router();

// 用户相关
router.put('/api/login', user.login);
router.post('/api/signup', user.signup);
router.put('/api/resetPwd', user.resetPwd);

// 发送验证码
router.post('/api/sendCaptcha', sendCaptcha);

module.exports = router;
