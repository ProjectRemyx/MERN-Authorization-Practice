const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

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
    (req, res) => {
    const errors = validationResult(req);
    //If there are errors 
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() }); //Bad Request, get our validation messages sent back
    }
    res.send('User route'); 
});
module.exports = router;