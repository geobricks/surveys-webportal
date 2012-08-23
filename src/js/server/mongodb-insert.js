// ExpressJS
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
	db.models.save({title : req.body.title, 
					description : req.body.description, 
					creationDate: new Date(), 
					dateLastUpdate: new Date(),
					defaultLanguage: req.body.defaultLanguage}, function(err, model) {
		if (err || !model) {
			res.send("Error Saving new Model: " + err);
		} else {
			res.send(req.query.callback + "(" + JSON.stringify(model) + ");"); 
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
			res.send(req.query.callback + "(" + JSON.stringify(req.params.id) + ");");
		}
	});
});

// Listen
app.listen(5000);
console.log('Listening on port 5000 for MongoDB - INSERT');