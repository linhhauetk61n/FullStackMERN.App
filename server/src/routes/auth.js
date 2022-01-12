const express = require( 'express' );
const router = express.Router();

const authController = require( '../app/controllers/AuthController' );
const verifyToken = require( '../app/middleware/auth' );

// @route [GET] api/auth
// @desc Check if user is Login
// @access Public
router.get( '/', verifyToken, authController.checkLogin );

// @route [POST] api/auth/register
// @desc Register user
// @access Public 

router.post( '/register', authController.register );

// @route [POST] api/auth/login
// @desc Login user
// @access Public

router.post( '/login', authController.login );
module.exports = router;