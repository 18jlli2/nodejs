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
        res1.on("end",function(d){//监听end事件，请求结束后调用
             list=JSON.parse(message);//对接收到的数据进行编码
            res.send(list);
                 });//在窗口打印出数据

});

request.end();
});
app.listen(3000,function(){console.log("connect right")});