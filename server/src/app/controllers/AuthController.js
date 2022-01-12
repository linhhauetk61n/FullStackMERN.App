const User = require( '../models/User' );
const argon2 = require( 'argon2' );
const jwt = require( 'jsonwebtoken' );

class AuthController
{
    //[GET] /api/auth
    async checkLogin ( req, res )
    {
        try
        {
            const user = await User.findById( req.userId ).select( '-password' );
            if ( !user )
            {
                return res.status( 400 ).json( { success: false, message: "User not found" } );
            }
            res.json( { success: true, user } );
        } catch ( error )
        {
            console.log.apply( error );
            res.status( 500 ).json( { success: false, message: 'Internal server error' } );
        }
    };
    //[POST] /api/auth/register
    async register ( req, res )
    {
        const { username, password } = req.body;
        if ( !username || !password )
            return res.status( 400 ).json( { success: false, message: 'Missing username and/or password' } );
        try
        {
            //Check for exist user
            const user = await User.findOne( { username } );
            if ( user )
                return res.status( 400 ).json( { success: false, message: 'Username already taken' } );

            //All good
            const hashedPassword = await argon2.hash( password );
            const newUser = new User( { username, password: hashedPassword } );
            await newUser.save();

            // Return Access token
            const accessToken = jwt.sign( { userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET );
            res.json( { success: true, message: 'User created successfully', accessToken } );

        } catch ( error )
        {
            console.log( error );
            res.status( 500 ).json( { success: false, message: 'Internal server error' } );
        }

    };

    //[POST] /api/auth/login
    async login ( req, res )
    {
        const { username, password } = req.body;
        if ( !username || !password )
            return res.status( 400 ).json( { success: false, message: 'Missing username and/or password' } );
        try
        {
            //Check for existing user
            const user = await User.findOne( { username } )
            if ( !user )
            {
                return res.status( 400 ).json( { success: false, message: 'Incorrect username or password' } );
            }
            //Username found
            const passwordValid = await argon2.verify( user.password, password );
            if ( !passwordValid )
            {
                return res.status( 400 ).json( { success: false, message: 'Incorrect password or password' } );
            }
            //All good => return token
            const accessToken = jwt.sign( { userId: user._id }, process.env.ACCESS_TOKEN_SECRET );
            res.json( { success: true, message: 'User logged in successfully', accessToken } );
        } catch ( error )
        {
            console.log( error );
            res.status( 500 ).json( { success: false, message: 'Internal server error' } );
        }

    };



};
module.exports = new AuthController;