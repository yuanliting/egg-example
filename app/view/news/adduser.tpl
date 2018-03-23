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
       <header>
    <h1 class="headerH">
    添加用户信息
    </h1>
    
  </header>
  <main>
    <div class="center">
     <a href="/user">首页</a><br/>
     姓名：<input  type="text"  v-model="name"/>
        <br/><br/>
        年龄: <input type="number" v-model="age"/></br></br>
        手机号: <input type="number" v-model="phoneNumber"/>
        <button type="submit" class="give submit" @click="add()">提交</button>
    </div>
  </main>
   
   </div>

  </body>
  <script>
    var vue = new Vue({
        el:'#demo',
        data:{
         message:false,
         name:'',
         age:0,
         phoneNumber:0
        },
        created(){
         
        },
        methods:{
          add(){
            let pattern = /^[1-9]+$/;
            var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
            if(pattern.test(this.age) && this.name && reg.test(this.phoneNumber)){
                 let param = {
                name:this.name,
                age:this.age,
                phoneNumber:this.phoneNumber
               }
              axios.post('/addUserInfo',{ params: param }).then(( result ) => {
               console.log( result );
               if(result.data.error == 0){
                //  alert(result.data.message);
                 location.href = '/user'
               }else{
                  alert(result.data.message);
               }
             }).catch(( error ) => {
               console.log( error );
               })
            }else{
              alert('请输入姓名和正常的年龄，中国大陆手机号');
            }
           
          } 
        }
    })
  </script>
</html>