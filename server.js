//Get express into variable and initialize
const express = require('express');
const app = express();

//Endpoint
app.get('/', (req, res) => res.send('API Running'));


//Set our port for our server to run on 
const PORT = process.env.PORT || 5000;

//Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


