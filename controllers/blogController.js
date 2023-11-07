const Blog = require('../models/blog');
const Auth = require('../models/auth');


//blog_index , blog_details , blog_create_get , blog_create_post, blog_delete

const blog_signup_get=(req,res)=>{
  res.render('Auth/Signup',{title:'Signup'});
}

const bcrypt = require('bcrypt');

const blog_signup_post = async (req, res, next) => {
  try {
    // Hash the password using bcrypt
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      // Create a new user with the same field names as in LocalStrategy
      const user = new Auth({
        username: req.body.username,
        password: hashedPassword
      });
      const result = await user.save();
      res.redirect("/log-in");
    });
  } catch (err) {
    return next(err);
  }
};



const blog_login_get=(req,res)=>{
   res.render('Auth/login',{title:'Log-In'});
}



const blog_index=(req,res)=>{
    Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('blogs/index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
     res.render('404',{title:'Blog not Found'});
    });
}

const blog_details=(req,res)=>{
     const id = req.params.id;
  Blog.findById(id)
    .populate('user')
    .then(result => {
      res.render('blogs/details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
      console.log(err);
    });
}

const blog_create_get =(req,res)=>{
    res.render('blogs/create', { title: 'Create a new blog' });
}

const blog_create_post = (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).send('User not authenticated or missing user ID');
  }

  const user = req.user;

  const blogData = {
    title: req.body.title,
    snippet: req.body.snippet,
    body: req.body.body,
    user: user._id, // User ID
    userName: user.username  // User name
  };

  const blog = new Blog(blogData);
  blog.save()
    .then(result => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
};


const blog_delete=(req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
}


module.exports={
    blog_signup_get,
    blog_signup_post,
    blog_login_get,
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}

