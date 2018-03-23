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
    首页
    </h1>
  </header>
  <main>
  <div v-if="message">
    <input type="search" placeholder="搜索用户名" v-model="name"/>
    <button type="submit" class="search" @click="search()">搜索</button>
  <table>
    <tr>
     <td>姓名</td>
     <td>年龄</td>
     <td>手机号</td>
     <td colspan="2">操作</td>    
   </tr> 
   <tr v-for="(u,index) in users">
     <td><{u.name}></td>
     <td><{u.age}></td>
     <td><{u.phoneNumber}></td>
     <td> <button @click="remove(index,u._id)">删除</button>  </td>
     <td> <button @click="edit(index,u._id)">编辑</button> </td>
   </tr>
</table>
  </div>
  <button class="addTd" @click="add()">添加用户信息</button>
  <button class="addTd" @click="logout()">退出</button>
  <a href="/ueditorPage">ueditorPage编辑器</a></br></br></br>
  <button @click="sendOss()">向OSS上传文件</button></br></br></br>
  <button @click="getData()">获取OSS上的数据</button></br></br></br>
  <button @click="getJavaData()">获取java后台的数据</button></br></br></br>
  <button @click="getExcelFile()">读取excel文件</button></br></br></br>
  <a href="/eggMultipart">eggMultipart多图片上传</a></br></br></br>
  <a href="/sendInforPage">前端倒计时发送数据</a></br></br></br>
  <a href="/sendMessagePage">后端倒计时发送短信</a></br></br></br>
  <a href = "/socketPage">双向数据通信页面</a>
  </main>

   </div>

  </body>
  <script>
    var vue = new Vue({
        el:'#demo',
        delimiters: ['<{', '}>'],
        data:{
         message:false,
         users:[],
         name:''
        },
        created(){
          axios.get('/users').then(( result ) => {
            if(result.data.error == 1){
              if(document.cookie){
                this.message = false;
              }
            }else{
               this.message = true;
               this.users = result.data.message;
            }
          }).catch(( error ) => {
            console.log( error );
          })
        },
        methods:{
            add(){
                location.href = '/addUser';
            },
            remove(index,id){
             let param = {
               index:index,
               id:id
             }
             axios.post('/removeUser',{ params: param }).then(( result ) => {
               location.reload();
             }).catch(( error ) => {
               console.log( error );
             })
            },
            edit(index,id){
              location.href = `edit/${id}`;
            },
            logout(){
              axios.get('/logout').then(( result ) => {
                location.href = '/login';
              }).catch(( error ) => {
                console.log( error );
              })
            },
            search(){
              if(this.name){
                let param = {
                  name:this.name
                }
                axios.post('/search/',{params:param}).then(( result ) => {
                  if(result.data.error == 0){
                   this.users = result.data.message;
                  }
                }).catch(( error ) => {
                  console.log( error );
                })
              }else{
                alert('请输入要搜索的用户名')
              }
              
            },
            sendOss(){
              axios.post('/report',{params:20180118}).then(( result ) => {
                console.log( result );
              }).catch(( error ) => {
                console.log( error );
              })
            },
            getData(){
              let param = '20180118-yuan'
              axios.post('/getReport',{params:param}).then(( result ) => {
                console.log(result);
              }).catch((error) =>{
                console.log(error);
              })
            },
            getJavaData(){
             axios.post('/getJavaData').then(( result ) => {
                console.log(result);
              }).catch((error) =>{
                console.log(error);
              }) 
            },
            getExcelFile(){
               axios.post('/getExcelFile').then(( result ) => {
                console.log(result);
              }).catch((error) =>{
                console.log(error);
              }) 
            },
        }
    })
  </script>
</html>