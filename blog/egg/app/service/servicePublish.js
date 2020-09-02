'use strict';

const Service = require('egg').Service;
class servicePublish extends Service {
  async servicePublish() {
    const data = this.ctx.request.body;
    const username = data.username;
    const title = data.title;
    const article = data.article;
    const date = data.date;
    const res = this.app.mysql.insert('article', { username, title, article, date });
    return {
      code: 1,
      msg: '发布完成',
      res,
    };
  }
}

module.exports = servicePublish;
