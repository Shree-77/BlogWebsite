const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogroutes');
const User = require('./models/auth');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Express app
const app = express();

// Connect to the database
const dbURI = process.env.MONGODB_URI; // Blogs
mongoose.connect(dbURI)
  .then((result) => app.listen(8080))
  .catch((err) => {
    console.log(err);
  });

// Register view engine
app.set('view engine', 'ejs');

// Authentication using passport middleware
app.use(session({
  secret: 'cats',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 3600000 // Set the session timeout to 1 hour (in milliseconds)
  }
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// Middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  res.locals.user = req.user; // Add this line to make the 'user' available in templates
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Configure passport
configurePassport();

// Routes

app.get('/', (req, res) => {
  res.redirect('/signup');
});


// Demo Login
app.get('/demo-login', (req, res) => {
  
  req.body.username = 'shree'; 
  req.body.password = '123';
  passport.authenticate('local', {
    successRedirect: '/blogs', 
    failureRedirect: '/signup', 
  })(req, res);
});



// Login
app.post('/log-in',
  passport.authenticate('local', {
    successRedirect: '/blogs',
    failureRedirect: '/signup',
  })
);

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// Blog routes
app.use('/', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

// Configuring Passport for LocalStrategy
function configurePassport() {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username: username });
        if (!user) {
          return done(null, false, { message: 'Incorrect username' });
        }

        // Use bcrypt to compare the provided password with the hashed password in the database
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
          return done(null, false, { message: 'Incorrect password' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  // Serialize user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}
