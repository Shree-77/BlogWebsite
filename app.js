const express = require('express');

//Express app

const app = express();

//Register view Engine

app.set('view engine','ejs');



//listen for req

app.listen(8080);

const Hpath = './views/index.html';
const Apath = './views/about.html'
const Epath='./views/404.html';

app.get('/',(req, res)=>{
   res.sendFile(Hpath,{root:__dirname});
});

app.get('/about',(req, res)=>{
  res.sendFile(Apath,{root:__dirname});
});

//redirects

app.get('/about-us',(req,res)=>{
    res.redirect('/about');
})


//404 Page
app.use((req,res)=>{
    res.sendFile(Epath,{root:__dirname});
})


