<html>
  <head>
    <title>Hacker News</title>
    <link rel="stylesheet" href="/public/css/index.css"/>
    <script type="text/javascript" src="/public/js/jquery-3.2.1.js"></script>
    <script src="/public/js/vue.js"></script>
    <script src="/public/js/axios.min.js"></script>
     <script src="/public/js/vue-router.min.js"></script>
  </head>
  <body>
  
   <div id="demo">
      <h1>这是注册</h1>
   <main>
        <p class="login">管理员注册</p>

    
        姓名：<input  type="text"  v-model="name"/>
        <br/><br/>
        密码: <input type="number" v-model="pwd"/></br></br>
        <button type="submit" class="give" @click="register()">注册</button>
         <button type="submit" class="give" @click="login()">登陆</button>
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
    register:function(){ 
     let param = {
       name:this.name,
       pwd:this.pwd
     }
    axios.post('/add',{params:param }).then(( result ) => {
       console.log(result);
       if(result.data.error = 0){
         alert(result.data.message);
         location.href = '/login';
       }else{
        location.href = '/login';
       }
     }).catch(( err ) => {
      console.log('err', err);
    })
  },
    login(){
         location.href = '/login';
    }
  }
    })
  </script>
</html>