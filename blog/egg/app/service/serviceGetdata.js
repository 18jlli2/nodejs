'use strict';

const Service = require('egg').Service;
class serviceGetdata extends Service {
  async servicegetUsername() {
    const user = this.ctx.query.user;
    const result1 = await this.app.mysql.select('register', {
      where: {
        username: user,
      },
      columns: [ 'username' ],
    });

    const result2 = await this.app.mysql.select('register', {
      where: {
        telephone: user,
      },
      columns: [ 'username' ],
    });
    const result = result1.length ? result1[0].username : result2[0].username;
    return result;
  }
  async servicegetAllArticle() {
    const result = await this.app.mysql.select('article');
    return result;
  }
  async servicegetThisArticle() {
    const title1 = this.ctx.query.title;
    const result = await this.app.mysql.select('article', {
      where: {
        title: title1,
      },
    });
    return result;
  }
}

module.exports = serviceGetdata;
