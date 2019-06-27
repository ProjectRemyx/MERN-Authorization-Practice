const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Profile = require('../../models/Profile');

//Create route
// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try{
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if(!profile)
        {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }
        else
        {
            res.json(profile);
        }
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}); 

//Create route
// @route   GET api/profile
// @desc    Create or update a user profile
// @access  Private
router.post('/',
    [
    auth, 
    [
    check('status', 'Status is required')
        .not()
        .isEmpty()
    ]
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    //After checking for validation errors, pull everything from the body
    const {
        status,
        bio,
        twitter,
        facebook,
        instagram,
        linkedin
    } = req.body;

    //Build profile object to insert into the database
    const profileFields = {};
    profileFields.user = req.user.id;
    
    //Check if the data is coming in before setting
    if (status) profileFields.status = status;
    if (bio) profileFields.bio = bio;

    //Build social object
    profileFields.social = {};
    //Check if the data is coming in before setting
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try{
        //Look for user
        let profile = Profile.findOne({ user: req.user.id });
        
        //If the profile is found update it and send back profile
        if(profile){
            // Update
            profile = await Profile.findOneAndUpdate(
            { user: req.user.id }, 
            { $set: profileFields }, 
            { new: true }
            );
            return res.json(profile);
        }

        //If not found, create it
        profile = new Profile(profileFields);

        //Save and send back profile
        await profile.save();
        res.json(profile);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

