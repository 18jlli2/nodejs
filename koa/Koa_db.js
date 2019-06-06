const Koa =require('Koa');
const app=new Koa();
const mysql=require('mysql');
const bodyParser = require('koa-bodyparser');
var router= require('koa-router')();
const koaBody = require('koa-body');

var con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'ljl094813.',
    database:'test1',
    multipleStatements:true
});
con.connect();
app.use(koaBody());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

router.get('/find',async(ctx,next) => {
    const sqlStr = 'select * from grade ';
    return new Promise(function(resolve, reject) {
        con.query(sqlStr, (err, results) => {
         if (err) throw err;
           ctx.body = results;
resolve(next());
        });
    });
});
//添加
router.post('/add',async(ctx)=>{

 const data = ctx.request.body;
    console.log(data);
    const sqlStr = 'insert into grade set ?';
con.query(sqlStr, data, (err, results) => {
        if (err) {throw err; status=false};
 console.log("right");

          });

 //let pastData= await parsePostData(ctx);
// ctx.body=pastData;
   
});
/*以下部分均为 使用post请求时返回请求参数的问题   未完成

function parsePostData(ctx){
  
  // 利用ES6的语法new一个Promise对象，其中传递两个值，resolve是成功的，而reject是失败的
  
  return new Promise((resolve,reject)=>{
    
    try{
            // 对获取到的值进行处理
        
    let postdata="";
         
   ctx.req.on('data',(data)=>{
           
     postdata += data
         
   })
     
       ctx.req.addListener("end",function(){
      
          // 把我们在全局定义的postdata传递给parseQueryStr，进行格式的转化
      
          let parseData = parseQueryStr( postdata )
       
         // 把成功后的parseData传出去
            
    resolve(parseData);
            })
    
    }catch(error){
      
      // 把错误的信息返回出去
       
     reject(error);
     
   }
  
  });

}
//  *POST字符串解析JSON对象
function parseQueryStr(queryStr){
  
  let queryData={};
   
 let queryStrList = queryStr.split('&');
 
   console.log(queryStrList);
  
  // 利用了ES6提供的forOf，可以找找相关的看看
  
  for( let [index,queryStr] of queryStrList.entries() ){
 
       // 进行切割
    
    let itemList = queryStr.split('=');
     
   console.log(itemList);
     
   queryData[itemList[0]] = decodeURIComponent(itemList[1]);
   
 }
    return queryData

}
*/

//修改
router.post('/update',async(ctx)=> {
    const id = ctx.request.body.id;
    const name = ctx.request.body.name;
    const tel =ctx. request.body.tel;
    const sqlStr1 = "update grade set name='" + name+ "'where id=" + id ;
      const sqlStr2 = "update grade set tel=' "+ tel+ "'where id=" + id ;
    con.query(sqlStr1, (err, results) => {
        if (err) throw err;
         })
con.query(sqlStr2, (err, results) => {
        if (err) throw err;
    })
   
});

//删除
router.delete('/delete',async(ctx,next) => {
     let id = ctx.query.id;
    return new Promise(function(resolve, reject) {
    const sqlStr = 'delete  from grade where id='+id;
        con.query(sqlStr,(err, results) => {
         if (err) throw err;
       ctx.body="success";
resolve(next());
        });
});
});

app.listen(3000,function(){
    console.log('connect right');
});