// ExpressJS
var express = require('express');
var app = express();
app.enable("jsonp callback");

// init DB
var databaseUrl = "geobricks";
var collections = ["models"];
var db = require("mongojs").connect(databaseUrl, collections);

// Insert New Survey
app.get("/insert/model/:title/:description", function(req, res, next) {
	db.models.save({title : req.params.title, description : req.params.description, date: new Date()}, function(err, model) {
		if (err || !model) {
			res.send("Error Saving new Model: " + err);
		} else {
			res.json(model);
		}
	});
});

// Find all Surveys
app.get("/select/model/:title", function(req, res, next) {
	if (req.params.title == "*") {
		query = {};
	} else {
		query = {title : req.params.title};
	}
	db.models.find(query, function(err, models) {
		if (err || !models) {
			res.send("Error Fetching the Model: " + err);
		} else {
			res.send(req.query.callback + "(" + JSON.stringify(models) + ");"); 
		}
	});
});

// Listen
app.listen(3000);
console.log('Listening on port 3000');