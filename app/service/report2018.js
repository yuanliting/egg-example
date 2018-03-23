const _ = require('lodash');


module.exports = app => {

  //const fileUrl = app.config.global.fileUrl + '/gene';

  return class extends app.Service {

    //将文件存储到OSS上
    *build(sampleCode) {
      const oss = this.service.oss;
      oss.setConfig(app.config.oss.bucket);
      let reporting = {};
      reporting.name = 'yuan',
      reporting.age = 23;
      yield oss.setContent('report/' + sampleCode + '-' + reporting.name + '.json', JSON.stringify(reporting));
      return reporting;
    }

    //获取OSS上的文件
    *getReportContent(sampleCode) {
      const oss = this.service.oss;
      oss.setConfig(app.config.oss.bucket);
      let reportingContent = yield oss.getContent('report/' + sampleCode + '.json');
      let reportingN = JSON.parse(reportingContent);
      console.log(123456,reportingN);
      return reportingN;
    }

    //获取java后台的样本
    *getJavaData(){
      const api = this.service.api;
      let result = yield api.bto().post('/user/account/reg');
      let reportingN = JSON.stringify(result);
      return reportingN;
    }
  }
}
