const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/dateValues", function(req, res, next){
    console.log("get worked...");
});

app.listen(3000, function(){
    console.log("yes it works...");
});
