// ExpressJS
var express = require('express');
var app = express();
app.enable("jsonp callback");
app.use(express.bodyParser());

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
			if (req.query.callback == null || req.query.callback == "") {
				res.send(JSON.stringify(model));
			} else {
				res.send(req.query.callback + "(" + JSON.stringify(model) + ");");
			}
		}
	});
});

// Find all Model
app.get("/select/model/:id", function(req, res, next) {
	if (req.params.id == "*") {
		query = {};
		db.models.find(query, function(err, models) {
			if (err || !models) {
				res.send("Error Fetching the Model: " + err);
			} else {
				if (req.query.callback == null || req.query.callback == "") {
					res.send(JSON.stringify(models));
				} else {
					res.send(req.query.callback + "(" + JSON.stringify(models) + ");");
				}
			}
		});
	} else {
		query = {_id: db.ObjectId(req.params.id)};
		db.models.findOne(query, function(err, models) {
			if (err || !models) {
				res.send("Error Fetching the Model: " + err);
			} else {
				if (req.query.callback == null || req.query.callback == "") {
					res.send(JSON.stringify(models));
				} else {
					res.send(req.query.callback + "(" + JSON.stringify(models) + ");");
				}
			}
		});
	}
});

// Delete Model By Id
app.get("/delete/model/:id", function(req, res, next) {
	db.models.remove({_id: db.ObjectId(req.params.id)}, function(err, model) {
		if (err || !model) {
			res.send("Error Deleting the Model: " + err);
		} else {
			if (req.query.callback == null || req.query.callback == "") {
				res.send(JSON.stringify(req.params.id));
			} else {
				res.send(req.query.callback + "(" + JSON.stringify(req.params.id) + ");");
			}
		}
	});
});

// add question
app.post("/addQuestion/model", function(req, res, next) {
	console.log(req.body);
	console.log(req.body.model_id);
	console.log(req.body.question);
	db.models.update({_id: db.ObjectId(req.body.model_id)}, {$addToSet: {questions: req.body}}, function(err, model) {
		if (err || !model) {
			res.send("Error Adding Question: " + err);
		} else {
			if (req.query.callback == null || req.query.callback == "") {
				res.send(JSON.stringify(req.params.id));
			} else{
				res.send(req.query.callback + "(" + JSON.stringify(req.params.id) + ");");
			}
		}
	});
});

// Listen
app.listen(3000);
console.log('Listening on port 3000 for MongoDB');



/**
 * query inner object: 
 * db.models.find({"questions.number": 1})
 * 
 * count all questions with number >= 1
 * db.models.find({"questions.number" : {$gte : 1}}).count()
 */