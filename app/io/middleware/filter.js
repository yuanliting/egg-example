

'use strict';
// 登录人的数量
let chatNums = 0;
 
//发送与接收socket请求
module.exports = () => {
  return async (ctx, next) => {
    console.log(1,ctx.packet);
    let username = '';
    let addUser = false;
    let user = {};
    
    //聊天内容
    let msg = '';
    //是否广播消息
   let inform = false;
    user.name =  ctx.packet.username;
    ctx.socket.username = ctx.packet[1].username;
    
    
    //添加用户
   // const addU = await ctx.controller.chat.addU(user);
    ctx.socket.on('add user', function(data){
      ++chatNums;
      addUser = true;

      //进入聊天室之前先登陆
      ctx.socket.emit('login',{username:ctx.socket.username,chatNums:chatNums,username:ctx.socket.username,msg:'欢迎' + '-' + ctx.socket.username + '-' + '进入我们的聊天室！'});
      console.log('人数:',chatNums);

      //广播消息--有人加入了聊天室
      ctx.socket.broadcast.emit('joining',{username:ctx.socket.username,chatNums:chatNums,msg:'欢迎' + '-' + ctx.socket.username + '-' + '进入我们的聊天室！'})

    });

    let num = 0;
   //接收消息
   ctx.socket.on('send infor', function(data){
     ++num;
     console.log(num,data.msg);
     username = data.username;
     msg = data.msg;
     inform = true;
    });
    

    setTimeout(function(){
      if(inform){
        //给其他人广播消息(除了发消息的这个人)
       ctx.socket.broadcast.emit('inform',{username:username,msg:msg});
      }
    },1000)
   
   

     // 有人离开时，断开连接，通知所有人，有人离开了
     ctx.socket.on('disconnect', function(){
      if(addUser){
          --chatNums;
          ctx.socket.broadcast.emit('user logout', {
              chatNums:chatNums,
              username:username
          })
      }
    })

    await next();
    console.log('packet response!');
  };
};
