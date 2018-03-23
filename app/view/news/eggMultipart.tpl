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

     <h1>eggMultipart</h1>
     
    
            <input name="file1" id="doc" onchange="javascript:setImagePreviews();" type="file" multiple/><br/><br/>
            <button @click="btn()" >Upload</button><br/><br/>
            

            <div id="dd" style=" width:990px;"></div>



   </div>
  </body>
  <script>
     let fileList = [];
     function setImagePreviews(avalue) {

        var docObj = document.getElementById("doc");

        var dd = document.getElementById("dd");

        dd.innerHTML = "";

         fileList = docObj.files;

        for (var i = 0; i < fileList.length; i++) {            

            dd.innerHTML += "<div style='float:left' > <img id='img" + i + "'  /> </div>";

            var imgObjPreview = document.getElementById("img"+i); 

            if (docObj.files && docObj.files[i]) {

                //火狐下，直接设img属性

                imgObjPreview.style.display = 'block';

                imgObjPreview.style.width = '150px';

                imgObjPreview.style.height = '180px';
                

                //imgObjPreview.src = docObj.files[0].getAsDataURL();

                //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式

                imgObjPreview.src = window.URL.createObjectURL(docObj.files[i]);

            }

            else {

                //IE下，使用滤镜

                docObj.select();

                var imgSrc = document.selection.createRange().text;

                alert(imgSrc)

                var localImagId = document.getElementById("img" + i);

                //必须设置初始大小

                localImagId.style.width = "150px";

                localImagId.style.height = "180px";

                //图片异常的捕捉，防止用户修改后缀来伪造图片

                try {

                    localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";

                    localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;

                }

                catch (e) {

                    alert("您上传的图片格式不正确，请重新选择!");

                    return false;

                }

                imgObjPreview.style.display = 'none';

                document.selection.empty();

            }

        }  

        return true;
    }

    
    var vue = new Vue({
        el:'#demo',
        data:{
            fileList:fileList
        },
        methods:{
            btn(){
                let formData = new FormData()
                for (var i = 0; i < fileList.length; i++) {
                    formData.append('file', fileList[i])
                }
                console.log(123456,formData.get('file'))
                formData.append('types[]', 'main')
                const url = '/uploadesPicture'
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                    }
                axios.post(url, formData, config).then((result) => {
                    console.log(result);
                    if(result.data.res == '200'){
                        setTimeout(function(){
                            location.reload();
                        },2000)
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        }
    })
  </script>
</html>