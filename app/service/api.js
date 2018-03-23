const axios = require('axios');

module.exports = app => {
  return class extends app.Service {

    bto(){
      return axios.create({
          baseURL: app.config.global.apiUrl,
          timeout: 5000,
          headers: {
              'Content-Type': 'application/json',
              'appId': app.config.global.appId,
              'accessToken': app.config.global.accessToken,
          }
      });
    }

  }
}
