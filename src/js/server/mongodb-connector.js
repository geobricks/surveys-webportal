/**
 * Express JS
 */
var $ = require('jquery');
var express = require('express');
var app = express();
app.enable("jsonp callback");
app.use(express.bodyParser());

/**
 * Initiate the DB
 */
var databaseUrl = "geobricks";
var collections = ["models", "answers"];
var db = require("mongojs").connect(databaseUrl, collections);

/**
 * Insert a new model
 */
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

/**
 * Find all models
 */
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

/**
 * Find all answers
 */
app.get("/select/answer/:id", function(req, res, next) {
	if (req.params.id == "*") {
		query = {};
		db.answers.find(query, function(err, models) {
			if (err || !models) {
				res.send("Error Fetching the Answer: " + err);
			} else {
				if (req.query.callback == null || req.query.callback == "") {
					res.send(JSON.stringify(models));
				} else {
					res.send(req.query.callback + "(" + JSON.stringify(models) + ");");
				}
			}
		});
	} else {
		query = {"meta.model_id": req.params.id};
		db.answers.find(query, function(err, models) {
			if (err || !models) {
				res.send("Error Fetching the Answer: " + err);
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

/**
 * Delete model by ID
 */
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

/**
 * Add question
 */
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
 * Remove a question from a given model  
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
 * @param modelID The ID of the model (survey)
 * @param questionID The ID of the question
 * 
 * This function gets all the answers for a given question and model and return a 
 * vector of frequencies of the answers. This function is used mainly
 * to produce a chart of the model  
 */
app.get("/aggregate/answers/:modelID/:questionID", function(req, res, next) {
	
	/**
	 * Query MongoDB to get all the answers to a given question in the model
	 */
	query = {"meta.model_id": req.params.modelID, "data.question_id" : req.params.questionID}, {data : {$slice: [(req.params.questionID - 1), 1]}};
	db.answers.find({"meta.model_id": req.params.modelID, "data.question_id" : parseInt(req.params.questionID)}, {data : {$slice: [(parseInt(req.params.questionID) - 1), 1]}}, function(err, models) {
		
		if (err || !models) {
			res.send("Error Fetching the Answer: " + err);
		} else {
			
			/**
			 * Initiate the variable
			 */
			var answerTypes = new Array();
			var counts = new Array();
			
			/**
			 * Iterate over the result
			 */
			for (var i = 0 ; i < models.length ; i++) {
				
				var v = models[i].data[0].answer;
				
				/**
				 * If the found answer is new it is added to the vector of counts,
				 * otherwise its frequency record is increased by one
				 */
				if ($.inArray(v, answerTypes) == -1) {
					answerTypes.push(v);
					counts[v] = 1;
				} else {
					counts[v]++;
				}
			}
			
			/**
			 * Return the result as JSON
			 */
			if (req.query.callback == null || req.query.callback == "") {
				res.send(JSON.stringify(counts));
			} else {
				res.send(req.query.callback + "(" + JSON.stringify(counts) + ");");
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