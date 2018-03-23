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
      <h1>这是编辑用户页面</h1>
      
   <main>
    <div class="center">
    <a href="/user">首页</a><br/><br/>
     姓名：<input  type="text"  v-model="name" value="name" disabled />
        <br/><br/>
        年龄: <input type="number" v-model="age"  value="age"/></br></br>
        手机号: <input type="number" v-model="phoneNumber" value="phoneNumber"/>
        <button type="submit" class="give" @click="edit()">编辑</button>
    </div>  
   </main>      
   </div>

  </body>
  <script>
    var vue = new Vue({
        el:'#demo',
         delimiters: ['<{', '}>'],
        data:{
            name:'',
           age:0,
           phoneNumber:0,
           user:{}
        },
        created(){
            let url = window.location.href;
            let id = url.slice(27,51);
            let param = {
               id:id
             }
            let that = this;
             axios.post('/editUser',{ params: param}).then(( result ) => {
            that.user = result.data;
            that.name = that.user.name;
            that.age = Number(that.user.age);
            that.phoneNumber = Number(that.user.phoneNumber);
             }).catch(( error ) => {
               console.log( error );
             })
        },
        methods:{
            edit(){
            let url = window.location.href;
            let id = url.slice(27,51);
            let param = {
                id:id,
                name:this.name,
                age:this.age,
                phoneNumber:this.phoneNumber
            }
            axios.post('/editSend',{ params: param }).then(( result ) => {
                // console.log(result);
                location.href = '/user';
            }).catch(( error ) => {
                console.log( error );
            })
            }
  }
    })
  </script>
</html>