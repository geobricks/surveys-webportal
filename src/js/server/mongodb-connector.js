// ExpressJS
var express = require('express');
var app = express();

// MongoDB connector
var dao = require("./mongodb-dao");

app.get('/insert/survey/:title/:description', function(req, res, next) {
	try {
		dao.addSurvey(req.params.title, req.params.description);
		res.send("Survey Saved!");
	} catch (err) {
		res.send("Error Saving the Survey: " + err);
	}
});
app.listen(3000);
console.log('Listening on port 3000');