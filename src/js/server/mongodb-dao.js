exports.addSurvey = function(title, description) {

	// init variables
	var databaseUrl = "geobricks";
	var collections = ["surveys"];
	var db = require("mongojs").connect(databaseUrl, collections);

	// insert
	db.surveys.save({title : title, description : description}, function(err, saved) {
		if (err || !saved) {
			console.log("Error Saving the Survey: " + err);
		} else {
			console.log("Survey Saved: " + saved);
		}
	});

};

exports.selectSurvey = function(title) {
	
	// init variables
	var databaseUrl = "geobricks";
	var collections = ["surveys"];
	var db = require("mongojs").connect(databaseUrl, collections);
	
	db.surveys.find({title : title}, function(err, surveys) {
		if (err || !surveys) {
			console.log("Error Saving the Survey: " + err);
		} else {
			surveys.forEach(function(survey) {
				console.log(survey);
			});
		}
	});
	
};