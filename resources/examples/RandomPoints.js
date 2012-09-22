for (var i = 0 ; i < 250 ; i++) {
	var minLat = 23.7081951987208;
	var maxLat = 23.714796341007222;
	var minLon = 90.40310382843018;
	var maxLon = 90.41996955871582;
	var lat = Math.random() * (maxLat - minLat) + minLat;
	var lon = Math.random() * (maxLon - minLon) + minLon;
	printjson('lat: ' + lat + ', lon: ' + lon);
	var income = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
	var children = Math.floor(Math.random() * (8 - 2 + 1)) + 2;
	var education = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
	var obj = {
		"meta":{
		   "model_id": "504e1efed6f33bb421000001",
		   "date":"2012-09-10",
		   "user":"Kalimaha",
		   "location":[
		      lat,
		      lon
		   ]
		},
		"data":[
		   {
		      "question_id":1,
		      "answer":income
		   },
		   {
		      "question_id":2,
		      "answer":children
		   },
		   {
		      "question_id":3,
		      "answer":education
		   }
		]
	}
	db.answers.save(obj);
}