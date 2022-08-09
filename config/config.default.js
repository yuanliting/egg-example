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
    appId: process.env.APP_ID || 'xxx',
    accessToken: process.env.ACCESS_TOKEN || 'xxx',
    apiUrl: process.env.API_URL || 'xxx',
    accountUrl: process.env.ACCOUNT_URL || 'xxx',
    staticUrl: process.env.STATIC_URL || '/static',
    staticVersion: new Date().getTime(),
    fileUrl: process.env.FILE_URL || 'xxx',
    reportUrl: process.env.REPORT_URL || 'xxx',
  };
  config.oss = {
      accessKeyId: process.env.OSS_ID || 'xxx
      accessSecret: process.env.OSS_Secret || 'xxx',
      endpoint: process.env.OSS_endpoint || 'xxx',
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
