const express = require('express');
const router = express.Router();

//Create route
// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/', (req, res) => res.send('Posts route')); 

module.exports = router;