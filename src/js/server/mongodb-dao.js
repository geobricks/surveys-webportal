exports.addSurvey = function(title, description) {

	// init variables
	var databaseUrl = "geobricks";
	var collections = [ "surveys" ];
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