// ExpressJS
var express = require('express');
var app = express();

// MongoDB connector
var dao = require("./mongodb-dao");

// Insert New Survey
app.get("/insert/survey/:title/:description", function(req, res, next) {
	try {
		dao.addSurvey(req.params.title, req.params.description);
		res.send("Survey Saved!");
	} catch (err) {
		res.send("Error Saving the Survey: " + err);
	}
});

// Find all Surveys
app.get("/select/survey/:title", function(req, res, next) {
	try {
		//dao.selectSurvey(req.params.title);
		//res.send("Survey(s) Found!");
		
		var databaseUrl = "geobricks";
		var collections = ["surveys"];
		var db = require("mongojs").connect(databaseUrl, collections);
		var query = "";
		
		// select all, or by title
		if (req.params.title == "*") {
			query = {};
		} else {
			query = {title : req.params.title};
		}
		
		db.surveys.find(query, function(err, surveys) {
			if (err || !surveys) {
				console.log("Error Saving the Survey: " + err);
			} else {
				res.format({
					'application/json': function() {
						res.send(JSON.stringify(surveys));
					}
				});
			}
		});
		
	} catch (err) {
		res.send("Error Saving the Survey: " + err);
	}
});

// Listen
app.listen(3000);
console.log('Listening on port 3000');