// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Setup port
const port = 8000;

// Require Express to run server and routes
const express = require("express");

// Requiure body-parser
const bodyParser = require("body-parser");

// require cors
const cors = require("cors");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})