

'use strict';
const egg = require('egg');
const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');
const ueditor = require('ueditor');
var crypto = require('crypto'); // 加密库
const uuidV1 = require('uuid/v1');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const toArray = require('stream-to-array');
var xlsx = require('node-xlsx');

function md5(str) {
    　　var ret = crypto.createHash('md5').update(str.toString()).digest("hex");
    　　return ret;  
    }

    
class HomeController extends Controller {
    async index() {
        await this.ctx.render('news/index.tpl');
    };
    async login(){
        await this.ctx.render('news/login.tpl');
    };
    async addUser(){
        await this.ctx.render('news/adduser.tpl');   
    };
    async edit(){
        await this.ctx.render('news/editUser.tpl'); 
    };
    async ueditorPage() {
        await this.ctx.render('news/ueditor.tpl');
    };
    async layuiPage() {
        await this.ctx.render('news/layuiIndex.tpl');
    };
    async eggMultipart() {
        await this.ctx.render('news/eggMultipart.tpl');
    };
    async sendInforPage() {
        await this.ctx.render('news/sendInfor.tpl');
    };
    async sendMessagePage() {
        await this.ctx.render('news/sendMessage.tpl');
    };
    async socketPage() {
        await this.ctx.render('news/socketPage.tpl');
    };

    //   注册
    async add(){
        try {
            let query = this.ctx.request.body;
            let name = query.params.name;
            let pwd = query.params.pwd;
            let admin = await this.ctx.model.Admin.findOne({name:name});
        if(!admin){
            console.log('不存在');
        let people = {
            name:name,
            pwd:pwd
        }
            let newAdmin = await this.ctx.model.Admin.create(people);
            let error;
            let message = '';
            let success = {
                error:0,
                message:'注册成功',
            }
            this.ctx.body = success;
        //    this.ctx.redirect('/login');
        }else{
            // 请去登陆
            console.log('存在');
            let successed = {
                error:1,
                message:'已注册，请登陆'
            }
            this.ctx.body = successed;
        }
        
        } catch (error) {
            throw error;
        }
    };

    //   登陆
    async loginS(){
        try{
            let getUserInfo = this.ctx.request.body.params;
            let nameL = getUserInfo.name;
            let pwdL = getUserInfo.pwd;
            let error;
            let message = '';
            let fail;
            let adminL = await this.ctx.model.Admin.findOne({name:nameL});
            if(adminL){
            //    验证用户
                    console.log('有该用户');
                if(adminL.pwd != pwdL){
                let  success = {
                        error:1,
                        message:'密码错误'
                    }
                    this.ctx.body = success;
                }else{
                let  successed = {
                        error:0,
                        message:'登陆成功'
                    }
                let clientId =  `${nameL}##`;
                if(!this.ctx.cookies.get('loginAdmin')){
                    this.ctx.cookies.set('loginAdmin',clientId,{
                        maxAge: new Date(2100, 1, 1, 0, 0, 0)
                    });
                }
                if(!this.ctx.session.admin){
                    this.ctx.session.admin = `管理员的名字为${nameL}`
                }
                console.log(`${this.ctx.session.admin} , 登陆时间: ${new Date().getFullYear()}年${new Date().getMonth()}月${new Date().getDate()}日${new Date().getHours()}点${new Date().getMinutes()}`);
                this.ctx.body = successed;
                }
            }else{
            //     //   提醒用户你未注册，请去登陆 
                console.log('没有');
                let without = {
                    fail:1,
                    message:'未注册'
                }
                this.ctx.body = without;
            }
        } catch (error) {
            throw error;
        }
    }
    async user(){
        await this.ctx.render('news/user.tpl');
    };
    // 首页
    async find(){ 
        try {
            let users = await this.ctx.model.User.find({});
            let error;
            let message = ''; 
            if(users.length == 0){
                console.log('没有用户');
                let userO = {
                    error:1,
                    message:'没有用户，请去添加'
                }
                this.ctx.body = userO; 
            }else if(!this.ctx.cookies.get('loginAdmin')){
                console.log('没登录');
                let userM = {
                    error:1,
                    message:'没有登录，请去添加'
                }
                this.ctx.body = userM; 
            }else{
                let userN = {
                    error: 0,
                    message:users
                }
                this.ctx.body = userN; 
                console.log( this.ctx.session);
            }
        } catch (error) {
            throw error;
        }
    };

    async addUserInfo(){
        try {
            let getUserInfo = this.ctx.request.body.params;
            let name = getUserInfo.name;
            let phoneNumber = `${getUserInfo.phoneNumber}.0`;
            let error;
            let message = '';
            let user =  await this.ctx.model.User.find({name:name,phoneNumber:phoneNumber});
            console.log(user);
            if( user.length > 0 ){
                let successed = {
                    error:1,
                    message:'已经添加过该用户'
                }
                this.ctx.body = successed;
            }else{
                let newUser = await this.ctx.model.User.create(getUserInfo);
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
  
    async removeUser(){
        try {
            let id = this.ctx.request.body.params.id;
        await this.ctx.model.User.remove({_id:id});
        this.ctx.body = '删除成功';
        } catch (error) {
            throw error;
        }
    };

    async editUser(){
            try {
                let id = this.ctx.request.body.params.id;
                let user = await this.ctx.model.User.findOne({_id:id});    
                this.ctx.body = user;
            } catch (error) {
                throw error;
            }
        };

    
        async editSend(){
            try {
                let param = this.ctx.request.body.params;
                let id = param.id;
                let user = await this.ctx.model.User.findOne({_id:id}); 
                let name = param.name;  
                let age = param.age;
                let phoneNumber = param.phoneNumber;
                let userN = {
                    name:name,
                    age:age,
                    phoneNumber:phoneNumber
                }
                //await this.ctx.model.User.update(user,userN); 
                this.ctx.runInBackground(async () => {
                    // 这里面的异常都会统统被 Backgroud 捕获掉，并打印错误日志
                    await this.ctx.model.User.update(user,userN); 
                    });
                this.ctx.body = '编辑成功';  
            } catch (error) {
                throw error; 
            }
    };

    async logout(){
            this.ctx.cookies.set('loginAdmin','');
            if(this.ctx.session){
                console.log(`${this.ctx.session} , 退出时间: ${new Date().getFullYear()}年${new Date().getMonth()}月${new Date().getDate()}日${new Date().getHours()}点${new Date().getMinutes()}`);
                this.ctx.session = null;
            }
            if(this.ctx.session == null){
                console.log('退出成功');
            }
            this.ctx.body = '退出成功';
    };

    async search(){
       try {
        let param = this.ctx.request.body.params;
        let name = param.name;
        let error;
        let message = '';
        let users = await this.ctx.model.User.find(); 
        let user = await this.ctx.model.User.find({name:{$regex:name}});
           if(user){
            let success = {
                error:0,
                message:user
            }
            this.ctx.body = success;
           }else{
             let fail = {
                 error:1,
                 message:'没有与之相关的用户'   
                 }
           this.ctx.body = fail; 
           }
       } catch (error) {
        throw error;   
       }
       
    };

    async uploadsImg(){
     //客户端上传文件设置
     let imgDir = '../public/img/ueditor/';
     let ActionType = this.ctx.query.action;
       try {
            if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
                let file_url = imgDir;//默认图片上传地址
                /*其他上传格式的地址*/
                if (ActionType === 'uploadfile') {
                    file_url = '../public/file/ueditor/'; //附件
                }
                if (ActionType === 'uploadvideo') {
                    file_url = '../public/video/ueditor/'; //视频
                }
                this.ctx.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
                this.ctx.setHeader('Content-Type', 'text/html');
            }
        // 客户端发起其它请求
                else {
                    this.ctx.redirect('/public/ueditor/nodejs/config.json');
                }
        } catch (error) {
            await sendToWormhole(stream);
            throw err;
        }
       
    };

    async uploadsImgPOST(){
         //客户端上传文件设置
         const stream = await this.ctx.getFileStream();
         let imgDir = '../public/img/ueditor/';
         let ActionType = this.ctx.query.action;
         let buf;
         let parts;
         //console.log('action',ActionType);
         try {
           if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
                    let file_url = imgDir;//默认图片上传地址
                    /*其他上传格式的地址*/
                    if (ActionType === 'uploadfile') {
                        file_url = '../public/file/ueditor/'; //附件
                    }
                    if (ActionType === 'uploadvideo') {
                        file_url = '../public/video/ueditor/'; //视频
                    }
                     parts = await toArray(stream);
                     buf = Buffer.concat(parts);
                     const filename = md5(parts) + path.extname(stream.filename).toLowerCase();
                     const target = path.join(__dirname, '../public/img/ueditor', filename);
                     await fs.writeFileSync(target, buf);
                     return this.ctx.body = { url: '/public/img/ueditor/' + filename ,state: 'SUCCESS'};
                }
            // 客户端发起其它请求
            else {
                    this.ctx.redirect('/public/ueditor/nodejs/config.json');
                }
        } catch (err) {
            await sendToWormhole(stream);
            throw err;
        }
    };

    async getExcelFile(){
      try {
        let arr = xlsx.parse('app/public/excel/基因.xlsx');
        let arred = arr[0].data[0];
        let name = arred[0];
        let geneCode = arred[1];
        let populorSecience = arred[2];
        let score = arred[3];
        let array = arr[0].data.slice(1);
        let geneArray = [];
        array.forEach((ele) => {
            let obj = {};
           obj.name = ele[0];
           obj.geneCode = ele[1];
           obj.populorSecience = ele[2];
           obj.score = ele[3];
           geneArray.push(obj);
        })
        return this.ctx.body = { res:200,msg:'success',data:arr,result:geneArray};
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    };

    //多图片上传
    async uploadesPicture() {
        const parts = this.ctx.multipart({ autoFields: true });
        const files = [];
        let stream;
            while ((stream = await parts()) != null) {
            const filename = stream.filename.toLowerCase();
            const target = path.join(this.config.baseDir, 'app/public/uploades', filename);
            const writeStream = fs.createWriteStream(target);
            try {
                await awaitWriteStream(stream.pipe(writeStream));
            } catch (err) {
                await sendToWormhole(stream);
                throw err;
            }
            files.push(filename);
            }
        console.log(1234,files);
        let arr = [];
        let num = files[0].indexOf('.');
        files.forEach((ele) => {
            let obj = {};
            obj.name = ele.substring(0, ele.length - 4);
            arr.push(obj);
        })
        console.log(arr);
        return this.ctx.body = { res:200,msg:'success'};
    };

    //倒计时发送数据
    async sendInfor(){
        try {
            let params = this.ctx.request.body;
            console.log(params);
            this.ctx.body = {res:200,msg:'success',data:'你的数据已经发送成功，这是结果'};
        } catch (error) {
         console.log(error);
         throw new Error(error);  
        }
    }
    
    //倒计时发送短信
    *sendMessage(ctx){
        console.log(ctx.request.body.params);
        let sendTime =  `时间: ${new Date().getFullYear()}年${new Date().getMonth()}月${new Date().getDate()}日${new Date().getHours()}点${new Date().getMinutes()}`;
        console.log(sendTime);
        this.ctx.body = {res:200,msg:'success',data:'你的数据已经发送成功，请等待分析结果，我们会在三天发送短信通知您!'};
        let SetttingService = ctx.service.setting;
        let result = yield SetttingService.bulid();
        console.log(result);

    }
}


      
       
   



module.exports = HomeController;
