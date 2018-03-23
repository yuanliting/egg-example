<html>
  <head>
    <title>Hacker News</title>
    <!--<link rel="stylesheet" href="/public/css/socketStyle.css"/>-->
    <link rel="stylesheet" href="/public/css/style.css" media="screen" type="text/css" />
    <script type="text/javascript" src="/public/js/jquery-3.2.1.js"></script>
    <script src="/public/js/vue.js"></script>
    <script src="/public/js/axios.min.js"></script>
    <script src="https://cdn.socket.io/socket.io-1.2.0.js"></script>
  </head>
<body>
<div class="uname">
    <div>
        <h2>What is your name ?</h2>
        <input type="text" class="unameInput" >
    </div>
</div>
<div id="convo" data-from="Sonu Joshi" class="content">  
<ul class="chat-thread">
	
</ul>
 <input  type="text" placeholder="聊天吧！" class="messageInput" />
    <button  class="sendBtn">发送</button>
</div>
<div style="text-align:center;clear:both">
</div>

<script src="/public/js/main.js"></script>

</body>
 <!-- 
<script>
    // 连接服务器，参数：服务器地址
  //  var socket = io('http://localhost:7002');
    // 服务器端(浏览器端)发射一个自定义事件，并传递数据
//  另一端，通过on来接收自定义事件，并执行一个回调函数，回调函数中的参数就是传递的数据
 //   socket.on('sayHello', '你好，我已经连接上服务器了');
 //  socket.on('res', function(data){
 //      console.log(data);
 //  })
</script>-->
</html>