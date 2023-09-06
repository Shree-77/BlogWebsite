const express = require('express');

//Express app

const app = express();

//Register view Engine

app.set('view engine','ejs');

//listen for req

app.listen(8080);


app.get('/',(req, res)=>{
    res.render('index');
});

app.get('/about',(req, res)=>{
  res.render('about');
});

app.get('/blogs/create',(req,res)=>{
    res.render('create');
})

//404 Page
app.use((req,res)=>{
    res.render('404');
})


