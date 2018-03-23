'use strict';

// had enabled by egg
// exports.static = true;
exports.nunjucks = {
    enable: true,
    package: 'egg-view-nunjucks'
  };
  exports.mongoose = {
    enable: true,
    package: 'egg-mongoose',
  };
  exports.vue = {
    enable: true,
    package: 'egg-view-vue',
  };
  exports.io = {
    enable: true,
    package: 'egg-socket.io',
  };
  exports.session = true;

  exports.session = true;
