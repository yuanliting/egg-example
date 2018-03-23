

/**
 * Created by Administrator on 2018/2/24.
 */

var socket = io('http://localhost:7001');

$(function(){

    var $unameInput = $('.unameInput');
    var $messageInput = $('.messageInput');
    // 输入框聚焦
    var $currentInput = $unameInput.focus();
    //消息容器
    var $messages = $('.chat-thread');
    // // 设置用户名称
    let username;

    window.onkeyup = function(ev){
        username = $unameInput.val().trim();
        if(username){
            if( ev.keyCode === 13 ){
                $('.uname').fadeOut();
                $('#convo').fadeIn();
                // 增加用户
                socket.emit('add user', {
                    username:username
                })
            }

        }else {
            alert('名字不能为空')
        }
    }


    // 创建标签及其内容 options:在哪个位置添加标签
    function createElement(message, options){
        var el = document.createElement('p');
        el.innerHTML = message;
        showElement(el, options)
    }
    // 将标签添加到DOM树中，在页面上显示
    function showElement(el, options){
        if( !options ){
            options = {};
        }

        if( options.prepend ){
            $messages.prepend(el);
        }else {
            $messages.append(el);
        }
    }

    // 创建标签及其内容 options:在哪个位置添加标签
    function createElementLi(name,message, options){
        var el = document.createElement('li');
        el.innerHTML = message;
        showElementLi(name,el, options)
    }

    // 将标签添加到DOM树中，在页面上显示
    function showElementLi(name,el, options){
        if( !options ){
            options = {};
        }
        if( options.prepend ){
            $messages.prepend(el);
        }else {
            console.log('名字：',name);
            var ie = document.createElement('i');
            name = name.substring(0,1);
            ie.innerHTML = name;
            el.append(ie);
            $messages.append(el);
        }
    }

    

    // 设置数量显示信息
    function numMessage(data){
        var message = '';
        if( data.chatNums == 1 ){
            message = 'there is 1 partner';
        } else {
            message = 'there are ' + data.chatNums + ' partners';
        }
        createElement(message);
    }

    //链接
    socket.on('res', function(data){
         console.log(data);
     })

    // 登录
    socket.on('login', function(data){
        var message =  'Welcome to Socket.IO Chat – ';
        createElement(message,{
            prepend:true
        });
        numMessage(data);
    })

    //有人加入聊天室
    socket.on('joining', function(data){
        var message = data.msg;
        username = data.username;
        createElement(message);
        numMessage(data);
    })

    $("button").click(function(){
        let msg = '';
        msg = $('.messageInput').val().trim();
        console.log(msg); 
        if(msg){ 
            createElementLi(username,msg);  
            // 发送消息
            socket.emit('send infor', {
                username:username,msg:msg
            })
        }else {
            alert('消息不能为空')
        }   
    });

    let num = 0;
    socket.on('inform',function(data){
        ++num;
        createElementLi(data.username,data.msg);
    })
  
      // 有人离开
    socket.on('user logout', function(data){
        var message = '通知：' + '-' + data.username + '-' + '离开聊天室!';
        createElement(message);
        numMessage(data);
    })

})



