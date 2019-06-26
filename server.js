//Get express into variable and initialize
const express = require('express');
const app = express();
const connectDb = require('./config/db'); //Get our database connection

//connect databasde
connectDb();

//Endpoint
app.get('/', (req, res) => res.send('API Running'));


//Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));


//Set our port for our server to run on 
const PORT = process.env.PORT || 5000;

//Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


