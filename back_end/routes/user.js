const Router = require('koa-router');
const user = require('../controllers/user');

const router = new Router();

router.put('/api/login', user.login);
router.post('/api/signup', user.signup);
router.put('/api/resetPwd', user.resetPwd);

module.exports = router;
