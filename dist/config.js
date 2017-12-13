'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NODEMAILER = exports.DB = exports.SYSTEM = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 系统配置
let SYSTEM = exports.SYSTEM = {
  //允许调用接口的域名，用来检测防盗链
  ORIGIN: 'http://127.0.0.1:1235/',
  // HTTP服务器端口号
  PROT: 1235,
  // 分页条数
  PAGESIZE: 10
};

let DB = exports.DB = {
  // 服务器地址
  HOST: '192.168.1.235',
  // 数据库端口号     
  PROT: 3306,
  // 数据库用户名              
  USER: 'mywufu',
  // 数据库密码    
  PASSWORD: 'aiwufu@2017',
  // 数据库名称    
  DATABASE: 'wufuo2o'
};

let NODEMAILER = exports.NODEMAILER = {
  // SMTP服务提供商域名
  HOST: '163',
  // 用户名/用户邮箱
  USER: 'xxx@163.com',
  // 邮箱密码
  PASSWORD: '132456'
};