var express = require("express");
var bodyParser = require("body-parser");
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
var axios = require("axios");

// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// external api
app.get("/people", function(req, res) {
  // event, context
  // req.apiGateway.event req.apiGateway.context
  // req.body (payload)
  axios
    .get("https://swapi.co/api/people/")
    .then(response => {
      res.json({
        success: "get call succeed!",
        url: req.url,
        people: response.data.results
      });
    })
    .catch(error => {
      res.json({
        error: true
      });
    });
});

// internal api with authentication
app.get("/coins", function(req, res) {
  axios
    .get("https://api.coinlore.com/api/tickers")
    .then(response => {
      res.json({
        success: "get call succeed!",
        url: req.url,
        coins: response.data.data
      });
    })
    .catch(error => {
      res.json({
        error: true
      });
    });
});

app.listen(3000, function() {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
