const axios = require('axios');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

module.exports = app => {

  return class extends app.Controller {

    *index( ctx ) {
      try {
        const reportService = ctx.service.report2018;
        const sampleCode = ctx.request.body.params;
         const reporting = yield reportService.build(sampleCode);
        ctx.body = {code:200, msg:'success'};
      } catch ( error ) {
          console.log( error );
          throw new Error( error );
      }
    }

     *getReport( ctx ) {
      const reportService = ctx.service.report2018;
      const sampleCode = ctx.request.body.params;
      const reporting = yield reportService.getReportContent(sampleCode);
      console.log( '获取的数据', reporting );
      ctx.body = {code:200, msg:'success'};
     }

     *getJavaData(ctx){
      const reportService = ctx.service.report2018;
      const reporting = yield reportService.getJavaData();
      console.log(reporting);
      ctx.body = {code:200, msg:'success'};
     }
  }
};
