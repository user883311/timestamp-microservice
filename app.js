

// console.log(__dirname);
// console.log(__filename);

const os = require("os");
console.log(`Total memory: ${os.totalmem()}`);
console.log(`Free memory: ${os.freemem()}`);

const fs = require("fs");

const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/dateValues", function (req, res, next) {
    
    console.log("GET worked...");
    res.end("Hello world!");
});

app.listen(3000, function () {
    console.log("yes it works...");
});
