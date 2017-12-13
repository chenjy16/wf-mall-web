'use strict';


/**
 * 主页显示
 * @param ctx
 */
exports.getHome = async(ctx) => {
  let pageCount; //主题的页数
  const onePageCount = 15; //一页的主题数量,其实配置不应该放这里
  let activePage = ctx.query.p || 1;//当前页
  let noReadMessageCount = 0;//没读取消息的数量
  let userTopics = [];
  var position = 'home';
  await ctx.render('home', {
    title: '主页',
    session: ctx.session,
    topics: topics,
    userTopics: userTopics,
    position: position,
    activePage: activePage,
    pageCount: pageCount,
    noReadMessageCount: noReadMessageCount,
    matches: matches,
  });
};