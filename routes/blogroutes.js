const express = require('express');
const blogController = require('../controllers/blogController');
const router = express.Router();


// blog routes

router.get('/signup',blogController.blog_signup_get);

router.post('/signup',blogController.blog_signup_post);

router.get('/log-in',blogController.blog_login_get);

router.get('/blogs/create', blogController.blog_create_get);

router.get('/blogs/:id',blogController.blog_details )

router.get('/blogs', blogController.blog_index);

router.post('/blogs', blogController.blog_create_post);

router.delete('/blogs/:id',blogController.blog_delete)

module.exports = router;