'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    async index() {
        const message = this.ctx.args[0];
        console.log('chat :', message + ' : ' + process.pid);
        const say = await this.ctx.service.user.say();
        this.ctx.socket.emit('res', say);
    }

    async addU(user){
        try {
            let name = user.name;
            let userO =  await this.ctx.model.User.find({name:name});
            console.log(userO);
            if( userO.length > 0 ){
                let successed = {
                    error:1,
                    message:'已经添加过该用户'
                }
                this.ctx.body = successed;
            }else{
                let newUser = await this.ctx.model.User.create(user);
                let success = {
                    error:0,
                    message:'添加用户信息成功'
                }
                this.ctx.body = success;
            }
        } catch (error) {
            throw error;   
        }
    };
  
  }
  return Controller;
};
