本项目技术栈:
- 使用ES7的Async/Await,避免回调地狱
- 模板引擎使用的ejs
- web框架koa2
- 进程管理pm2，安装npm install -g pm2
- 项目使用babel编译
- 项目通过gulp-nodemon 实时编译刷新node服务

pm2命令：
- pm2 list # 显示所有进程状态
- pm2 monit # 监视所有进程
- pm2 logs # 显示所有进程日志
- pm2 reload 应用名 #依次重启所有的工作线程。每一个线程会等待在新的线程创建之后才会被终止掉，因此，当你在产品环境部署新的代码时，server会不间断地一直保持运行。
- pm2 start run.js -i max # 根据机器CPU核数，开启对应数目的进程

运行方式:

- 开发环境：   npm run dev
- 打包：       npm run build
- 启动项目：   npm run server
- pm2启动方式：npm run pm2








