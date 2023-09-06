const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog')

//Express app

const app = express();

//connect to database

const dbURI = 'mongodb+srv://Shree:cB84gmaAEWQyniX6@cluster0.xlxclpj.mongodb.net/Blog-site?retryWrites=true&w=majority'; //Blog-site
mongoose.connect(dbURI).
then((result)=>app.listen(8080)).catch((err)=>{
    console.log(err);
})


//Register view Engine

app.set('view engine','ejs');


//middleware & Static files

app.use(express.static('public'));

app.use(morgan('dev'));



app.get('/',(req, res)=>{
    res.redirect('/blogs');
});

app.get('/blogs',(req,res)=>{
   Blog.find().sort({createdAt : -1})
   .then((result)=>{
    res.render('index',{title:'All Blogs',blogs:result})
   }).catch(err=>{
    console.log(err);
   })
});

app.get('/about',(req, res)=>{
  res.render('about',{title:'About'});
});

app.get('/blogs/create',(req,res)=>{
    res.render('create',{title:'Create'});
})

//404 Page
app.use((req,res)=>{
    res.render('404',{title:'404 Not Found'});
})


