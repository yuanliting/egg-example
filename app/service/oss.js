const OSS = require('ali-oss').Wrapper;



module.exports = app => {
  let clientBucket = app.config.oss.bucket;
  let client = new OSS({
          endpoint: app.config.oss.endpoint,
          accessKeyId: app.config.oss.accessKeyId,
          accessKeySecret: app.config.oss.accessSecret,
          bucket: clientBucket
  });

  return class extends app.Service {

    setConfig(bucket, endpoint, accessKeyId, accessSecret){
      if(bucket == clientBucket) return;
      clientBucket = bucket;

      client = new OSS({
          endpoint: endpoint || app.config.oss.endpoint,
          accessKeyId: accessKeyId || app.config.oss.accessKeyId,
          accessKeySecret: accessSecret || app.config.oss.accessSecret,
          bucket: bucket
      });
    }

    //设置文件，提交到oss上
    *setContent(fileName, content){
      try {
        yield client.put(fileName, new Buffer(content));
      } catch(error) {

      }
    }
    //获取oss上的文件
    *getContent(fileName){
      try {
        let result = yield client.get(fileName);
        return Buffer.from(result.content).toString();
      } catch(error) {
        return false;
      }
    }
    //可能时获取多个oss文件
    *getObjects(path){
      try {
        let files = [];
        let result = {
            isTruncated: true
        };
        while(result.isTruncated) {
            result = yield client.list({
              prefix: path,
              marker: result.nextMarker
            });
            result.objects.map((file) => {
                files.push(file);
            })
        }
        return files
      } catch(error) {
        return false;
      }
    }
  }
}
