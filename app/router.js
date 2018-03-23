'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io} = app;
  const ueditor = app.middlewares.ueditor();
  router.get('/', controller.home.index);
  router.post('/add', controller.home.add);
  router.get('/login', controller.home.login);
  router.post('/loginS', controller.home.loginS);
  router.get('/user', controller.home.user);
  router.get('/users', controller.home.find);
  router.get('/addUser',controller.home.addUser);
  router.post('/addUserInfo',controller.home.addUserInfo);
  router.post('/removeUser',controller.home.removeUser);
  router.post('/editUser',controller.home.editUser);
  router.get('/edit/:id',controller.home.edit);
  router.post('/editSend',controller.home.editSend);
  router.get('/logout',controller.home.logout);
  router.post('/search',controller.home.search);
  router.get('/ueditorPage',controller.home.ueditorPage);//进入ueditor编辑器页面
  router.get('/public/ueditor/ue',controller.home.uploadsImg);
  router.post('/public/ueditor/ue',controller.home.uploadsImgPOST);
  router.get('/layuiPage',controller.home.layuiPage);
  router.post('/report',controller.report2018.index);//给oss上传文件
  router.post('/getReport',controller.report2018.getReport);//获取oss上的文件
  router.post('/getJavaData',controller.report2018.getJavaData);//获取java后端的数据
  router.post('/getExcelFile',controller.home.getExcelFile);//读取excel文件
  router.get('/eggMultipart',controller.home.eggMultipart);//进入多图片上传页面
  router.post('/uploadesPicture',controller.home.uploadesPicture);//处理多图片上传
  router.get('/sendInforPage',controller.home.sendInforPage);//前端倒计时发送数据页面
  router.post('/sendInfor',controller.home.sendInfor);//前端倒计时发送数据
  router.get('/sendMessagePage',controller.home.sendMessagePage);//后端倒计时发送短信页面
  router.post('/sendMessage',controller.home.sendMessage);//后端倒计时发送短信
  router.get('/socketPage',controller.home.socketPage);//双向数据通信页面
  // app.io.of('/').route('chat', app.io.controller.chat.addU);//socket
  // // app.io.of('/')
  // app.io.route('chat', app.io.controller.chat.index);

  // // app.io.of('/chat')
  // app.io.of('/chat').route('chat', app.io.controller.chat.index);
};
