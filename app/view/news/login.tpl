<html>
  <head>
    <title>Hacker News</title>
    <link rel="stylesheet" href="/public/css/index.css"/>
    <script type="text/javascript" src="/public/js/jquery-3.2.1.js"></script>
    <script src="/public/js/vue.js"></script>
    <script src="/public/js/axios.min.js"></script>
  </head>
  <body>
  
   <div id="demo">
      <h1>这是登陆</h1>
   <main>
        <p class="login">管理员登陆</p>

    
        姓名：<input  type="text"  v-model="name"/>
        <br/><br/>
        密码: <input type="number" v-model="pwd"/></br></br>
        <button type="submit" class="give" @click="login()">登录</button>
        <button type="submit" class="give" @click="register()">注册</button>
   </main>
   </div>

  </body>
  <script>
    var vue = new Vue({
        el:'#demo',
        data:{
            name:'',
            pwd:''
        },
        methods:{
    login:function(){ 
     let param = {
       name:this.name,
       pwd:this.pwd
     }
    axios.post('/loginS',{ params:param }).then(( result ) => {
        if(result.data.error == 0){
         location.href = '/user';
       }else if(result.data.fail == 1){
        alert('未注册');
       }else if(result.data.error == 1){
          alert('密码错误');
       }
     }).catch(( err ) => {
      console.log('err', err);
    })
  },
    register(){
         location.href = '/';
    }
  }
    })
  </script>
</html>