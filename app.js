const express = require('express');

//Express app

const app = express();

//Register view Engine

app.set('view engine','ejs');

//listen for req

app.listen(8080);


app.get('/',(req, res)=>{
    const blogs=[
        {title:'I am Batman ', snippet:'Lorem ipsum dolor sit amet consectetur adipisicing'},
                {title:'Justice League ', snippet:'Lorem ipsum dolor sit amet consectetur adipisicing'},
                        {title:'Batman vs Superman ', snippet:'Lorem ipsum dolor sit amet consectetur adipisicing'}
    ];
    res.render('index',{title:'Home', blogs});
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


