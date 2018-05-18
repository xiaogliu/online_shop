const Router = require('koa-router');
const user = require('../controllers/user');

const router = new Router();

router.put('/login', user.login);
router.post('/signup', user.signup);

module.exports = router;
