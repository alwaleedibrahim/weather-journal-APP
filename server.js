// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Setup port
const port = 3000;

// Require Express to run server and routes
const express = require("express");

// Require body-parser
const bodyParser = require("body-parser");

// Require cors
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
});

app.get("/getData", (req, res) => {
    res.send(projectData);
});

app.post("/addData", (req, res) => {
    projectData = { ...req.body };
    res.end();
});