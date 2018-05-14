const Router = require('koa-router');
const user = require('../controllers/user');

const router = new Router();

router.post('/login', user.login);

module.exports = router;
