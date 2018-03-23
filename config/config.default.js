'use strict';

module.exports = appInfo => {
  const config = exports = {};
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_yuanliting$$$$';

  // config.static = {
  //   prefix: '/static/',
  //   dir: appInfo.baseDir + '/static'
  // };

  // add your config here
  config.middleware = ['ueditor'];

  config.global = {
    appId: process.env.APP_ID || 'AP328801193931309066',
    accessToken: process.env.ACCESS_TOKEN || '9b804b7f609e48d789d76f0effbe4ffe',
    apiUrl: process.env.API_URL || 'http://api.bto-dev.utoper.com',
    accountUrl: process.env.ACCOUNT_URL || 'http://account.bto-dev.utoper.com',
    staticUrl: process.env.STATIC_URL || '/static',
    staticVersion: new Date().getTime(),
    fileUrl: process.env.FILE_URL || 'http://files.bto-dev.utoper.com',
    reportUrl: process.env.REPORT_URL || 'http://gene-report.bto-dev.utoper.com/',
  };
  config.oss = {
      accessKeyId: process.env.OSS_ID || 'LTAI3cuPYRRhFYUk',
      accessSecret: process.env.OSS_Secret || 'jeFtIsxBjqX3ZL1Ojy2RikRk97zVQc',
      endpoint: process.env.OSS_endpoint || 'oss-cn-hangzhou.aliyuncs.com ',
      bucket: process.env.OSS_BUCKET || 'yuanliting',
  };
  config.CLIENT_PORT = {
    url:'http://localhost',
    port:'7001'
  };
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };
  config.io = {
    namespace: {
      '/': {
        connectionMiddleware: [ 'auth' ],
        packetMiddleware: [ 'filter' ],
      },
      // '/chat': {
      //   connectionMiddleware: [ 'auth' ],
      //   packetMiddleware: ['filter'],
      // },
    },
  };
  config.mongoose = {
    url: 'mongodb://127.0.0.1/example',
    options: {}
  };
  config.security = {
    csrf: {
      enable: false,
    }
  };
  return config;
};
