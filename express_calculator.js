var express = require ('express');
var http=require('http');
var app = new express();
app.get('/',function (req,res) {
    var cal = req.query;
    console.log(cal.key+'='+eval(cal.key));
    res.end(cal.key+'='+eval(cal.key));
});

app.listen(3000);