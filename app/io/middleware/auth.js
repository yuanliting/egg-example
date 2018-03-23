'use strict';
//确认链接服务器
module.exports = () => {
  return async (ctx, next) => {
    const say = await ctx.service.user.say();
    ctx.socket.emit('res',say);
    await next();
    // console.log('disconnect!');
  };
};
