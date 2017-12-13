'use strict';
import Router from 'koa-router'
const login = require('../controller/login');
const home = require('../controller/home');
const router = new Router()

router
/**
 * 主页
 */
 // .get('/', home.getHome)

  /**
   * 登录页面
   */
  .get('/', async(ctx) => {
    await ctx.render('login', {title: '登录界面', session: ctx.session});
  })

  /**
   * 登录的异步验证
   */
  .post('/login', login.login)


export default router
