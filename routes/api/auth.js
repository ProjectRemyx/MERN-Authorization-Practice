const express = require('express');
const router = express();

//Create route
// @route   GET api/auth
// @desc    Get auth
// @access  Public
router.get('/', (req, res) => res.send('Auth route'));

module.exports = router;