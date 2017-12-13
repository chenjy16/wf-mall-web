'use strict';
import Koa from 'koa';
const cors = require('koa-cors');
const compress = require('koa-compress');
const json = require('koa-json');
const views = require('koa-views');
const serve = require('koa-static');
const logger = require('koa-logger');
const convert = require('koa-convert');
const body = require('koa-better-body');
const onerror = require('koa-onerror');
const path = require('path');
import index from './routes/index';


const app = new Koa();
onerror(app);
//此处的convert是为了转化，实际是koa核心包含了一个叫koa-convert的模块，
//它里面warning说，以generator作为中间件的写法将在koa@3里不支持但是用co或koa-convert转过的还是可以的
// 记录所用方式与时间
app.use(convert(logger()))
// 传输JSON
app.use(convert(json()))
// body解析
app.use(convert(body({
    uploadDir: path.join(__dirname, 'uploads'),
    keepExtensions: true
})))
// 设置渲染引擎
app.use(views(__dirname + '/views', {//这里应该是包含了ejs和别的一些，这里把扩展给限定为ejs
    extension: 'ejs'
}))
// 静态文件夹
app.use(convert(serve(__dirname + '/public/')))
//路由，最后处理到达路由，再由路由分发到相应的处理controller,这里是简单的MVC模型
app.use(index.routes())
app.use(async(ctx) => {
    if (ctx.status === 404) {
        await ctx.render('./error/404');
    }
})
app.listen(process.env.PORT || 3000)//这里监听端口
console.log(`Server up and running! On port  ${process.env.PORT || 3000} !`);