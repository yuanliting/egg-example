let AliDayu = require('node-alidayu');
let http=require('http');  
let querystring=require('querystring');  

module.exports = app => {
  return class extends app.Service {
    *bulid(){
      console.log(1234567);
        // let  client = new AliDayu({
        //   app_key: '你自己的',
        //   app_secret: '你自己的'
        //  });

        var data={  
          age:13,  
          time:new Date().getTime()  
      };  
      var content=querystring.stringify(data);  
      var options={  
          hostname:'localhost',  
          port:7001,  
          path:'/sendMessagePage', 
          data:data, 
          method:'GET'  
      }  
      //创建请求  
      var req = http.request(options,function(res){  
          console.log('STATUS:'+res.statusCode);  
          //console.log('HEADERS:'+JSON.stringify(res.headers));  
          res.setEncoding('utf-8');  
          res.on(options,function(chunk){  
              console.log('数据片段分隔-----------------------\r\n');  
              //console.log(chunk);  
          });  
          res.on('end',function(){  
              console.log('响应结束********');  
          });  
      });  
      req.on('error',function(err){  
          console.error(err);  
      });  
      req.end(); 

      return data;
      }

  }
}
