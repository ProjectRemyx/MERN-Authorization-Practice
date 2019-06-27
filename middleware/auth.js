const jwt = require('jsonwebtoken');
const config = require('config');

//Exporting middleware function that decodes our token
module.exports = function(req, res, next)
{
    //Get token from header
    const token = req.header('x-auth-token');

    //Check if no token
    if(!token)
    {
        //Not authorized
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    
    //Verify token
    try
    {
        //Decode token
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        //Take decoded info 
        req.user = decoded.user;
        next();
    }
    catch(err)
    {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}