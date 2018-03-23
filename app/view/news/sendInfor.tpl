<html>
  <head>
    <title>Hacker News</title>
    <link rel="stylesheet" href="/public/css/sendInfor.css"/>
    <script type="text/javascript" src="/public/js/jquery-3.2.1.js"></script>
    <script src="/public/js/vue.js"></script>
    <script src="/public/js/axios.min.js"></script>
     <script src="/public/js/vue-router.min.js"></script>
  </head>
  <body>
  
   <div id="demo">
      <h1>这是倒计时发送数据页面</h1>
      姓名：<input type="text" placeholder="输入姓名" v-model="name"/><br/><br/><br/>
      性别：女&nbsp;<input type="radio"  v-model="sex" value="female"/>&#x3000;男&nbsp;<input type="radio"  v-model="sex" value="male"/> <br/><br/><br/>
      年龄：<input type="number" placeholder="输入年龄" v-model="age" value="0" /> <br/><br/><br/>
      <input class="btn" id="btnSendCode" @click="submit()" value="发送数据吧" />
     <!-- <input id="results" value="无数据，需要填写表格"></input>-->
      <p id="results"></p>
   <main>
        
   </main>
   </div>

  </body>
  <script>
    var InterValObj; //timer变量，控制时间
    var count = 3; //间隔函数，1秒执行
    var curCount;//当前剩余秒数
    var vue = new Vue({
        el:'#demo',
        delimiters: ['<{', '}>'],
        data:{
           name:'',
           sex:'female',
           age:0,
        },
        methods:{
            submit(){
                curCount = count;
                let param = {
                            name:this.name,
                            sex:this.sex,
                            age:this.age
                        }
                //设置button效果，开始计时
                if(this.name && this.sex && this.age　){
                    $("#btnSendCode").val("请在" + curCount + "秒后查看数据");
                    InterValObj = window.setInterval(function(){
                    if (curCount == 0) {        
                        window.clearInterval(InterValObj);//停止计时器
                        $("#btnSendCode").val("重新发送数据");
                        //向后台发送处理数据
                            axios.post('/sendInfor',{params:param}).then(( result ) => {
                                let _that = this;
                                console.log(result);
                                 document.getElementById('results').innerHTML = result.data.data;
                            }).catch(( error ) => {
                                console.log( error );
                            })
                    }else {
                        curCount--;
                        $("#btnSendCode").val("请在" + curCount + "秒后查看数据");
                    }   
                    }, 1000); //启动计时器，1秒执行一次
                }
            },
           
  
        }
    })
  </script>
</html>