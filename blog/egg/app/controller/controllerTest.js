'use strict';

const Controller = require('egg').Controller;

class controllerTest extends Controller {
  async Test() {
    const result = this.ctx.request.body;
    console.log(result);
  }
}

module.exports = controllerTest;
