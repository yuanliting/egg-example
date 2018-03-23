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
      <h1>这是后端倒计时发送短信页面</h1>
      姓名：<input type="text" placeholder="输入姓名" v-model="name"/><br/><br/><br/>
      性别：女&nbsp;<input type="radio"  v-model="sex" value="female"/>&#x3000;男&nbsp;<input type="radio"  v-model="sex" value="male"/> <br/><br/><br/>
      年龄：<input type="number" placeholder="输入年龄" v-model="age" value="0" /> <br/><br/><br/>
      <input class="btn" id="btnSendCode" @click="submit()" value="发送短信吧" />
      <p id="results"></p>
      <p ></p>
   <main>
        
   </main>
   </div>

  </body>
  <script>
   
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
                let param = {
                            name:this.name,
                            sex:this.sex,
                            age:this.age
                        } 
                if(this.name && this.sex && this.age　){ 
                    //向后台发送处理数据
                    axios.post('/sendMessage',{params:param}).then(( result ) => {
                        let _that = this;
                        console.log(result);
                        document.getElementById('results').innerHTML = result.data.data;
                    }).catch(( error ) => {
                        console.log( error );
                    })
                }
            },
           
  
        }
    })
  </script>
</html>