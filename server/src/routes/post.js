const express = require('express');
const router = express.Router();
const verifyToken = require('../app/middleware/auth');

const postController = require('../app/controllers/PostController');

// @route [PUT] api/posts:id
// @desc Update Post
// @access Private
router.put('/:id', verifyToken, postController.update);

// @route [DELETE] api/posts:id
// @desc Delete Post
// @access Private
router.delete('/:id', verifyToken, postController.delete);

// @route [GET] api/posts
// @desc Get Posts
// @access Private
router.get('/', verifyToken, postController.get);

// @route [POST] api/posts
// @desc Create Post
// @access Private
router.post('/', verifyToken, postController.post);



module.exports = router;