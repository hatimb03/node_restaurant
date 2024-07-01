//This file manages the connection to mongoDB database using mongoose

// Steps:
// Require mongoose
// 1. mongourl(give mongodb localhost url)
// 2. Establish connction using mongoose.connect
// 3. define a mongoose default connection object
// 4. Define event listeners with the help of default connection object
// 5. Now export the object and import it in server.js


const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/restaurant';

mongoose.connect(mongoURL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})

//Getting the default connection
const db = mongoose.connection;

//Event listeners 

db.on('connected', () => {
    console.log("Connected to mongodb server");
})

db.on('disconnected', () => {
    console.log("Disonnected from mongodb server");
})

db.on('error', (err) => {
    console.log("Error connecting to the server", err);
})

module.exports = db;