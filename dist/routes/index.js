'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const login = require('../controller/login');
const home = require('../controller/home');
const router = new _koaRouter2.default();

router
/**
 * 主页
 */
// .get('/', home.getHome)

/**
 * 登录页面
 */
.get('/', (() => {
  var _ref = _asyncToGenerator(function* (ctx) {
    yield ctx.render('login', { title: '登录界面', session: ctx.session });
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})())

/**
 * 登录的异步验证
 */
.post('/login', login.login);

exports.default = router;