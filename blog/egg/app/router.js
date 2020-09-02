'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/home', controller.controllerLogin.Loginpage);// 主页面
  router.get('/register', controller.controllerRegister.controllerRegister);// 注册
  router.post('/commit', controller.controllerRegister.getInput);
  router.post('/login', controller.controllerLogin.judgeLogin);// 登陆
  router.post('/publish', controller.controllerPublish.publish);// 点击发布后执行
  router.get('/getData/getUsername', controller.controllerGetdata.getUsername);// 获取用户名字
  router.get('/getData/getAllArticle', controller.controllerGetdata.getAllArticle);// 获取所有文章
  router.get('/getData/getThisArticle', controller.controllerGetdata.getThisArticle);// 获取指定文章
};
