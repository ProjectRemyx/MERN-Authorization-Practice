const express = require('express');
const router = express();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

//Create route
// @route   GET api/auth
// @desc    Get user data
// @access  Public
router.get('/', auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//Create route
// @route   POST api/auth
// @desc    Authentic user and get token
// @access  Public
//Uses express-validator to check 
router.post(
    '/', 
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
    const errors = validationResult(req);
    //If there are errors 
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() }); //Bad Request, get our validation messages sent back
    }
    
    const { email, password } = req.body;

    try{
        //See if the user exists
        let user = await User.findOne({ email });

        //Mimic our error handling above
        if(!user)
        {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
        }
        else
        {
            //Take post password and check it with encrypted password
            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                return res
                .status(400)
                .json({ errors: [{ msg: 'Invalid credentials' }] });
            }

            //Return jsonwebtoken - Encryption when sending JSON information through the web
            /* https://jwt.io/introduction/ */
            const payload = {
                user: {
                    id: user.id 
                }
            }
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 }, 
                (err, token) => {
                if(err) throw err;
                res.json({ msg: 'Login Successful!', token });
            });
        }
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }

});

module.exports = router;