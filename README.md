# MERN Authorization/Practice
An application made to solidify concepts learned using MongoDb, Express, React and Node.js. 

Change Log:

June 26, 2019 (Begin Development)
- Created MongoDb Atlas Cluster
- Create package.json & install dependencies
    - express
    - express-validator
    - bcryptjs
    - config
    - gravatar
    - jsonwebtoken
    - mongoose
    - request
    - nodemon (-D)
    - concurrently (-D)
- Set up express & node server
    - Set port / start server
    - Make endpoint
- Made start scripts in package.json
    - nodemon server
- Tested basic endpoint with Postman
- Connected to Db
- Created additional API endpoints
- Created model for users table
- Edited user api end point to include validation
- Created salt, hashed password and save to db
- Registration completed incorporating JWT
- Created Get API request for auth.js which takes the de-coded user id and queries the database for the user's information
- Sign in user post request completed
- Added profile model schema
- Edited profile api endpoint for user's specific profile
