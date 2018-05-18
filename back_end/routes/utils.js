// import Router from 'koa-router';
// import utils from '../utils/email'

const Router = require('koa-router');
const utils = require('../controllers/utils');

const router = new Router();

router.post('/sendCaptcha', utils.sendCaptcha);

// export default router;

module.exports = router;
