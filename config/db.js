//This file will handle our database connection
const mongoose = require('mongoose');
const config = require('config'); 

//Get connection string from URI
const db = config.get('mongoURI');

//Asynchronous function connecting to our database
/* 
Note: JavaScript is a single threaded language and as such is not asynchronous. But with Async we can 
have JavaScript mimic asynchronous behavior/ Asynchronous functions always return a promise object. Await 
operates on a promise waiting until Promise/Resolves/Rejects 
*/
const connectDb = async () => {
    //Error handling
    try
    {
        //Connect to our db using mongoose
        await mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true });
        console.log('Connected to database...');
    }
    catch(err)
    {
        //Log error
        console.error(err.message);
        //Exit
        process.exit(1);
    }
}

//Export function to be used elsewhere
module.exports = connectDb;