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
	var cleanPayload = cleanJSONP(req.query);
	cleanPayload.model_date_last_update = new Date();
	cleanPayload.model_creation_date = new Date();
	db.models.save(cleanPayload, function(err, model) {
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

//add question
app.get("/addQuestion/model", function(req, res, next) {
	var cleanPayload = cleanJSONP(req.query);
	cleanPayload.model_id = req.query.model_id;
	db.models.update({_id: db.ObjectId(req.query.model_id)}, {$addToSet: {model_questions: cleanPayload}}, function(err, model) {
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

/**
 * db.models.update({"_id" : ObjectId("504223e971d8b28f76000001")}, {$pull : {model_questions : {question_number: "1"}}})
 * Remove a question from a given model * 
 */
app.get("/remove/question", function(req, res, next) {
	db.models.update({_id: db.ObjectId(req.query.model_id)}, {$pull : { model_questions : {question_number : req.query.question_id}}}, function(err, model) {
		if (err || !model) {
			res.send("Error Deleting Question: " + err);
		} else {
			if (req.query.callback == null || req.query.callback == "") {
				res.send(JSON.stringify(req.query));
			} else {
				res.send(req.query.callback + "(" + JSON.stringify(req.query) + ");");
			}
		}
	});
});

/**
 * @param query payload from HTTP request
 * @returns {JSON} clean payload
 * 
 * This function removes JSONP parameters 'callback' and '_' from the request not to save them in the DB
 */
function cleanJSONP(query) {
	var payload = {};
	$.each(query, function(k, v) {
		if (k == 'callback' || k == '_' || k == 'model_id') {
			
		} else {
			payload[k] = v;
		}
	});
	return payload;
}

// Listen
app.listen(3000);
console.log('Listening on port 3000 for MongoDB');