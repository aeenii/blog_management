const express = require('express');
const router = express.Router()
const blogController = require('../controllers/blogController')
router.get('/',blogController.getAllBlogs )
router.get('/:blogId',blogController.getBlogById )
module.exports = router
