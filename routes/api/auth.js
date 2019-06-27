const express = require('express');
const router = express();
const auth = require('../../middleware/auth');

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

module.exports = router;