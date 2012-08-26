// ExpressJS
var $ = require('jquery');
var express = require('express');
var app = express();
app.enable("jsonp callback");
app.use(express.bodyParser());

// init DB
var databaseUrl = "geobricks";
var collections = ["models"];
var db = require("mongojs").connect(databaseUrl, collections);

//Insert New Model
app.get("/insert/model", function(req, res, next) {
	db.models.save({title : req.query.title, 
					description : req.query.description, 
					creationDate: new Date(), 
					dateLastUpdate: new Date(),
					defaultLanguage: req.query.defaultLanguage}, function(err, model) {
		if (err || !model) {
			res.send("Error Saving new Model: " + err);
		} else {
			if (req.query.callback == null || req.query.callback == "") {
				res.send(JSON.stringify(model));
			} else {
				res.send(req.query.callback + "(" + JSON.stringify(model) + ");");
			}
		}
	});
});

// add question
app.get("/addQuestion/model", function(req, res, next) {
	console.log(req.query);
	db.models.update({_id: db.ObjectId(req.query.model_id)}, {$addToSet: {questions: req.query}}, function(err, model) {
		if (err || !model) {
			res.send("Error Adding Question: " + err);
		} else {
			if (req.query.callback == null || req.query.callback == "") {
				res.send(JSON.stringify(req.query));
			} else {
				res.send(req.query.callback + "(" + JSON.stringify(req.query) + ");");
			}
		}
	});
});

// Listen
app.listen(5000);
console.log('Listening on port 5000 for MongoDB - INSERT');