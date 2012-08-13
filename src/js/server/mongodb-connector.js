var express = require('express');
var app = express();

//"username:password@example.com/mydb"
var databaseUrl = "geobricks"; 
var collections = ["surveys"]
var db = require("mongojs").connect(databaseUrl, collections);

/**
 * @param title New survey's title
 * @param description New survey's description
 * 
 * Add a new survey in the 'geobricks' DB. 
 */
function addSurvey(title, description) {
	var result = "";
	db.surveys.save({title: title, description: description}, function(err, saved) {
	  if (err || !saved ) 
		  result = "Error: " + err;
	  else 
		  result = "Survey saved!";
	});
	return result;
}

app.get('/insert/survey/:title/:description', function(req, res, next) {
	var result = addSurvey(req.params.title, req.params.description); 
	console.log(result);
	res.send(result);
});
app.listen(3000);
console.log('Listening on port 3000');