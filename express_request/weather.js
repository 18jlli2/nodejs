var express=require('express');
var http=require('http');
var app=new express();
app.set('view engine','ejs');
app.get('/',function(req,res){
    var key="7e03894fee95da93b3f5c4ed2eac8260";
    var list="";
    var options={
        host:"apis.juhe.cn",//���ʵ�����
        path:encodeURI("/simpleWeather/query?key="+key+"&city="+req.query.city),//·���Ͳ���
        method:'get'
    }
    var message='';
    var request=http.request(options,function(res1){
        res1.on("data",function(chunk){
            message+=chunk;
        });
        res1.on("end",function(d){//����end�¼���������������
             list=JSON.parse(message);//�Խ��յ������ݽ��б���
            res.send(list);});//�ڴ��ڴ�ӡ������
    });
    request.end();

})
app.listen('3000','127.0.0.1');