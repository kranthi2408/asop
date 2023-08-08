var mysql=require("mysql");
var md5=require("md5");
var express=require("express");
var app=express();
var ejs=require("ejs");
app.set("view engine","ejs");
const { object } = require("webidl-conversions");
var bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({extended:true}));
var alert=require("alert");
var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    connectionLimit:10,
    database:"test"
})
con.connect(function(err){
    if(err){
        console.log(err)
    }
    else{
        console.log("connected successfully");
    }
})


app.get('/',function(req,res){
    res.sendFile(__dirname+"/a.html");
})
app.get('/login.html',function(req,res){
    res.sendFile(__dirname+"/login.html");
})
app.get('/reg.html',function(req,res){
    res.sendFile(__dirname+"/reg.html");
})
app.get('/main.html',function(req,res){
    res.sendFile(__dirname+'/main.html');
})
app.post('/login.html',function(req,res){
     var ph=req.body.email
    var pass=req.body.password
    console.log(ph,pass)
    con.query(`select password from customer where phonenumber=?`,[ph],function(err,result){
        if(err){
            console.log(err);
        }
        else{
               for(var row in result){
                for(var col in result[row]){
                    if(pass===result[row][col]){
                        res.redirect('/main.html')
                    }
                    else{
                        alert("wrong password try again");
                        res.redirect('back');
                    }
                }
               }
        }
    })
    
    
})
app.post('/reg.html',function(req,res){
    var name=req.body.name
   var email= req.body.email
   var phonenumber= Number(req.body.phonenumber)
    var password=req.body.password
    console.log(name,email,phonenumber,password)
  con.query(`insert into customer values(?,?,?,?)`,[phonenumber,name,email,password],function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("inserted sucessfully");
    }
  })
    res.redirect('/login.html');
})
app.listen(4040,function(){
    console.log("server is listening to port 4040");
})
