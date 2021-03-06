'use strict';

const Service = require('egg').Service;

class serviceJudgeLogin extends Service {
  async serviceJudgeLogin() {
    const account = this.ctx.request.body.username;
    const password = this.ctx.request.body.password;
    console.log(account + '\n' + password);
    // 通过用户名查询
    const judgeResult1 = await this.app.mysql.select('register', {
      where: {
        username: account,
        password,
      },
      columns: [ 'username' ],
    });
    if ((judgeResult1.length == 1) || (judgeResult2.length == 1)) {
      return {
        code: 1,
        message: '登陆成功',
        // token
      };
    }
    return {
      code: -1,
      message: '账号或密码有误',
    };

  }
}

module.exports = serviceJudgeLogin;
