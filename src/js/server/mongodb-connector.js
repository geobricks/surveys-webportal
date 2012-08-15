// ExpressJS
var express = require('express');
var app = express();
app.enable("jsonp callback");

// init DB
var databaseUrl = "geobricks";
var collections = ["models"];
var db = require("mongojs").connect(databaseUrl, collections);

// Insert New Model
app.get("/insert/model/:title/:description/:defaultLanguage", function(req, res, next) {
	db.models.save({title : req.params.title, 
					description : req.params.description, 
					creationDate: new Date(), 
					dateLastUpdate: new Date(),
					defaultLanguage: req.params.defaultLanguage}, function(err, model) {
		if (err || !model) {
			res.send("Error Saving new Model: " + err);
		} else {
			res.send(req.query.callback + "(" + JSON.stringify(model._id) + ");"); 
		}
	});
});

// Find all Model
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

// Delete Model By Id
app.get("/delete/model/:id", function(req, res, next) {
	db.models.remove({_id: db.ObjectId(req.params.id)}, function(err, model) {
		if (err || !model) {
			res.send("Error Deleting the Model: " + err);
		} else {
			res.send(req.query.callback + "(" + JSON.stringify(req.params.id) + ");"); 
		}
	});
});

// Listen
app.listen(3000);
console.log('Listening on port 3000 for MongoDB');


/**
db.models.update({"_id" : ObjectId("502b830d46c5439117000008")}, {$addToSet:{questions:{number: 1, en: "Hello"}}})
*/