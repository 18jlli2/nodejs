'use strict';

const Controller = require('egg').Controller;

class controllerGetdata extends Controller {
  async getUsername() {
    const result = await this.service.serviceGetdata.servicegetUsername();
    this.ctx.body = result;
  }
  async getAllArticle() {
    const result = await this.service.serviceGetdata.servicegetAllArticle();
    this.ctx.body = result;
  }
  async getThisArticle() {
    const result = await this.service.serviceGetdata.servicegetThisArticle();
    this.ctx.body = result;
  }

}

module.exports = controllerGetdata;
