var Koa = require('koa');
var router = require('koa-router')();
var http= require('http');
var app = new Koa();
app.use(router.routes());
app.use(router.allowedMethods());

router.get('/weather',async(ctx)=>{
       var options={
                    host:"apis.juhe.con",
                    path:encodeURI("/simpleWeather/query?city="+ctx.body.city+"&key=2c49bdc27909a7cc98e0ba7e1dea9ce5"),
                    method:'get'
};
var sendmsg='';
var request=http.request(options,function(res1){
response.on("data",function(chunk){
 sendmsg+=chunk;
  console.log(sendmsg);
});
        res1.on("end",function(d){//����end�¼���������������
             list=JSON.parse(message);//�Խ��յ������ݽ��б���
            res.send(list);
                 });//�ڴ��ڴ�ӡ������

});

request.end();
});
app.listen(3000,function(){console.log("connect right")});