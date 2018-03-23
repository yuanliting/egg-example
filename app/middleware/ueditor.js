'use strict';

const path = require('path');
const ueditor = require('ueditor');
module.exports = options => {
    return async function ueditor(ctx,next) {
        await next();
       
      
    }
}