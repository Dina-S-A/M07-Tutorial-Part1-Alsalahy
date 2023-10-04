const express = require('express');
const blogController = require('../controllers/blogController')


const router = express.Router();



//all blogs routes

router.get('/', blogController.blog_index);
  
  router.get ('/create' , blogController.blog_create_get);
  
  //post to DB new blog from creat blog page
  router.post('/', blogController.blog_create_post);
  
  
  // retrieving one blog with certain id
  
  router.get('/:id', blogController.blog_details);

  //deleting one blog
  
  router.delete('/:id', blogController.blog_delete);

  module.exports = router;