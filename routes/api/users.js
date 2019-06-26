const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

//Create route
// @route   POST api/users
// @desc    Register User
// @access  Public
//Uses express-validator to check 
router.post(
    '/', 
    [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
    ],
    async (req, res) => {
    const errors = validationResult(req);
    //If there are errors 
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() }); //Bad Request, get our validation messages sent back
    }
    
    const { name, email, password } = req.body;

    try{
        //See if the user exists
        let user = await User.findOne({ email });

        //Mimic our error handling above
        if(user)
        {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }
        else
        {
            //Get users gravatar and set size, make sure rating is ok and default in case doesn't have
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
    
            //Make new user 
            user = new User({
                name,
                email,
                avatar,
                password
            });
    
            //Create salt
            const salt = await bcrypt.genSalt(10);
            
            //Encrypt password
            user.password = await bcrypt.hash(password, salt);
    
            await user.save();
    
            //Return jsonwebtoken
    
            res.send('User registered'); 

        }
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }

});
module.exports = router;