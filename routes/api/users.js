const express = require('express');
const router = express.Router();

//Create route
// @route   GET api/users
// @desc    Get users
// @access  Public
router.get('/', (req, res) => res.send('User route')); 

module.exports = router;