const express = require('express');
const app = express();
const path = require('path');
const fs = require("fs");
const { title } = require('process');

app.set('view engine' , 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join( __dirname , "public" )));



app.get('/' , function(req,res){
    fs.readdir( `./files` , function(err , files){
        res.render("index" , {files:files});
    })
})

app.get('/file/:filename' , function(req,res){
    fs.readFile( `./files/${req.params.filename}`, "utf-8" , function(err , filedata){
        res.render('show' ,  { filedata:filedata , filename:req.params.filename } )
    })
})

app.post('/create' , function(req , res){
    fs.writeFile( `./files/${req.body.title.split(' ').join('')}.txt` , req.body.title , function(err){
        res.redirect('/')
        console.log(req.body)
    })
})

app.listen(3000 , function(){
})