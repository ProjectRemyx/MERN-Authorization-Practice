const express = require('express');
const router = express.Router();

//Create route
// @route   GET api/profile
// @desc    Get profile
// @access  Public
router.get('/', (req, res) => res.send('Profile route')); 

module.exports = router;