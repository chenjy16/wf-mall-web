'use strict';
const encipher = require('../common/encipher.js');


/**
 * 验证登录信息
 * @param ctx
 * @returns {*}
 */
exports.login = async(ctx) => {
  let data = ctx.body;
  let message = {};
  message.result = false;
  console.log(data);

  //update session
  ctx.session.user = userInfo;
  message.result = true;
  console.log("登录成功");
  ctx.body = message;
};

/**
 * 登出，删除session信息，返回到默认主页
 * @param ctx
 */
exports.logout = async(ctx)=> {
  ctx.session = null;
  await ctx.redirect('/');

}