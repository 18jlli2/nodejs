const express =require('express');
const app=express();
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
const mysql=require('mysql');
const connect=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'ljl094813.',
    database:'test1',
    multipleStatements:true
});
app.get('/api/find',(req,res)=>{
    const sqlStr='select*form grade';
    connect.query(sqlStr,(err,results)=>{
        if(err)return res.json({err_code:1,message:'no data',affextedRows:0});
        res.json({err_code:200,message:results,affextedRows:results.affextedRows});
    })
});
//条件查询
app.get('/api/conditionFind', (req, res) => {
    console.log('query:' + req.query);
    const tel = req.query.tel;
    const sqlStr = 'select * from grade where tel=?';
    connect.query(sqlStr, tel, (err, results) => {
        if (err) return res.json({err_code: 1, message: '数据不存在', affextedRows: 0});
        res.json({err_code: 200, message: results, affextedRows: results.affextedRows});
    })
});
//添加
app.post('/api/add', (req, res) => {
    console.log(req.body);
    const data = req.body;
    const sqlStr = 'insert into grade set ?';
    connect.query(sqlStr, data, (err, results) => {
        if (err) return res.json({err_code: 1, message: err, affectedRows: 0});
        res.json({err_code: 0, message: '添加成功', affectedRows: results.affectedRows});
    })
});
//修改
app.post('/api/update', function (req, res) {
    console.log(req.body);
    const id = req.body.id;
    const name = req.body.name;
    const tel=req.body.tel;
    const sqlStr = "update grade set name='" + name + "'where id=" + id&&"update grade set tel='" + tel + "'where id=" + id;
    connect.query(sqlStr, (err, results) => {
        if (err) return res.json({err_code: 1, message: err, affectedRows: 0});
        res.json({err_code: 0, message: '修改成功', affectedRows: results.affectedRows});
    })
});
//删除
app.delete('/api/delete/:id', function (req, res) {
    console.log('params:' + req.params);
    let id = req.params.id;
    let sql = 'delete from grade where id=' + id;
    connect.query(sql, id, (err, results) => {
        if (err) return res.json({err_code: 1, message: err, affectedRows: 0});
        res.json({err_code: 0, message: '删除成功', affectedRows: results.affectedRows})
    })
});
app.listen(3000,function(){
console.log('connect right in localhost:3000');
});















