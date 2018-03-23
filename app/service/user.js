'use strict';

module.exports = app => {
  class User extends app.Service {
    async say() {
      return '链接上了!';
    }
  }
  return User;
};
