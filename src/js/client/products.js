if (!window.Products) {
	
	window.Products = {
			
		map : null,
		
		init : function() {
			
			/**
			 * Initiate buttons
			 */
			$(".model-manager-button").jqxButton({ 
				width: '200', 
				theme: ModelsWebPortal.theme 
			});
			
			/**
			 * Show Table button
			 */
			$("#buttonShowTable").bind('click', function() {
				Products.initTable();
			});
			
			/**
			 * Show Map button
			 */
			$("#buttonShowMap").bind('click', function() {
				
				/**
				 * Get selected model's ID
				 */
				var rowindex = $('#models-grid').jqxGrid('getselectedrowindex');
            	var rows = $('#models-grid').jqxGrid('getrows');
            	var modelName = rows[rowindex].title;
            	var modelID = rows[rowindex].id;
            	var model = rows[rowindex].model;
            	
            	console.log(model);
            	
            	/**
            	 * Fetch answers by model ID
            	 */
            	$.ajax({
    				
    				type: 'GET',
    				url: 'http://localhost:3000/select/answer/' + modelID + '?callback=?',
    				dataType: 'jsonp',
    				jsonp: 'callback',
    				
    				/**
    				 * Show the answers on the map
    				 */
    				success : function(answers) {
    					$('#map_container').load('map.html', function() {
    						Products.initMap(model, answers);
    					});
    				},
    				
    				/**
    				 * Alert the user of the error
    				 */
    				error : function(err, b, c) {
    					alert(err.status + ", " + b + ", " + c);
    				}
    				
    			});
            	
			});
			
			/**
			 * Show Chart button
			 */
			$("#buttonShowChart").bind('click', function() {
				Products.initChart();
			});
			
			/**
			 * Fill the grid with available models
			 */
			ModelsManager.findAllModels();
			
			/**
			 * Translate elements
			 */
			Products.initI18N();
			
		},
		
		initI18N : function() {
			BabelFish.translateButton('buttonShowTable');
			BabelFish.translateButton('buttonShowMap');
			BabelFish.translateButton('buttonShowChart');
		},
		
		initTable : function() {
			
			var data = new Array();
			
			var row = {};
			row["gender"] = 'Male';
			row["city_area"] = 'North';
			row["average_income"] = 750;
			data[0] = row;
			
			row = {};
			row["gender"] = 'Male';
			row["city_area"] = 'South';
			row["average_income"] = 315;
			data[1] = row;
			
			row = {};
			row["gender"] = 'Male';
			row["city_area"] = 'East';
			row["average_income"] = 590;
			data[2] = row;
			
			row = {};
			row["gender"] = 'Male';
			row["city_area"] = 'West';
			row["average_income"] = 615;
			data[3] = row;
			
			row = {};
			row["gender"] = 'Female';
			row["city_area"] = 'North';
			row["average_income"] = 680;
			data[4] = row;
			
			row = {};
			row["gender"] = 'Female';
			row["city_area"] = 'South';
			row["average_income"] = 150;
			data[5] = row;
			
			row = {};
			row["gender"] = 'Female';
			row["city_area"] = 'East';
			row["average_income"] = 400;
			data[6] = row;
			
			row = {};
			row["gender"] = 'Female';
			row["city_area"] = 'West';
			row["average_income"] = 485;
			data[7] = row;
			
			var source = {
				localdata: data,
	            datatype: "array"
			};
				
			var dataAdapter = new $.jqx.dataAdapter(source);

			$("#table").jqxGrid({
				width: 768,
				height: 320,
				source: dataAdapter,
				columnsresize: true,
				showheader: true,
				sortable: true,
				enablehover: true,
				columns: [
				          {text: 'Gender', datafield: 'gender'},
				          {text: 'City Area', datafield: 'city_area'},
				          {text: 'Average Income', datafield: 'average_income'}
	                ],
	            theme: "ui-start"
			});
			
		},
		
		initChart : function() {
			
			var chart = new Highcharts.Chart({
		    
				chart: {
					renderTo: 'chart',
		            type: 'column',
		            height: 320
		        },
		    
		        title: {
		        	text: 'Average Income, Grouped By Gender'
		        },
		    
		        xAxis: {
		        	categories: ['North', 'South', 'East', 'West']
		        },
		    
		        yAxis: {
		        	allowDecimals: false,
		        	min: 0,
		        	title: {
		        		text: 'Average Income'
		        	}
		        },
		    
		        tooltip: {
		        	formatter: function() {
		        		return '<b>'+ this.x +'</b><br/>' + this.series.name +': '+ this.y +'<br/>' + 'Total: '+ this.point.stackTotal;
		        	}
		        },
		    
		        plotOptions: {
		        	column: {
		        		stacking: 'normal'
		        	}
		        },
		    
		        series: [{
		        	name: 'Male',
		            data: [750, 315, 590, 615],
		            stack: 'male'
		        }, {
		        	name: 'Female',
		        	data: [680, 150, 400, 485],
		        	stack: 'female'
		        }]
			});
			
		},
		
		/**
		 * This function calculate the center of the map
		 * just doing an average on the latitude and
		 * longitude of all the answers
		 */
		calculateMapCenter : function(answers) {
			
			var center_lat = 0;
			var center_lon = 0;
			
			for (var i = 0 ; i < answers.length ; i++) {
				center_lat += answers[i].meta.location[0];
				center_lon += answers[i].meta.location[1];
			}
			
			center_lat = center_lat / answers.length;
			center_lon = center_lon / answers.length;
			
			return new Array(center_lat, center_lon);
			
		},
		
		initMapUI : function(model, answers) {
			
			BabelFish.translateHTML('map_question_selector_label');
			
			var questions_data = new Array();
			var row = {};
			row['code'] = null;
			row['label'] = $.i18n.prop("type_please_select");
			questions_data[0] = row;
			
			for (var i = 0 ; i < model.model_questions.length ; i++) {
				var row = {};
				row['code'] = model.model_questions[i].question_number;
				row['label'] = model.model_questions[i][ModelsWebPortal.lang + '_text'];
				questions_data[1 + i] = row;
			}
			
			var questions_source = {
				localdata: questions_data,
				datatype: "json",
				datafields: [{name: 'code'}, {name: 'label'}],
				id: 'code'
			};
				
			var questions_data_adapter = new $.jqx.dataAdapter(questions_source);
			
			$("#map_question_selector").jqxDropDownList({ 
				source: questions_data_adapter, 
				displayMember: "label", 
				valueMember: "code",
				selectedIndex: 0, 
				width: '688', 
				height: '25px', 
				theme: ModelsWebPortal.theme
			});
			
			$("#map_question_selector").bind('change', function() {
				var item = ($("#map_question_selector").jqxDropDownList('getSelectedItem')).originalItem;
				Products.addMarkers(model, answers, item.code);
			});
			
		},
		
		initMap : function(model, answers) {
			
			/**
			 * Initiate the interface to control the map
			 */
			Products.initMapUI(model, answers);
			
			/**
			 * Initiate the map
			 */
			if (Products.map == null) {
				Products.map = L.map('map').setView(Products.calculateMapCenter(answers), 12);
			}
			
			L.tileLayer('http://{s}.tile.cloudmade.com/17ad8466b1c24b86b173b2a1d5492115/997/256/{z}/{x}/{y}.png', {
				attribution: 'GeoBricks.org',
				maxZoom: 17
			}).addTo(Products.map);			
			
		},
		
		/**
		 * Show markers on the map according to user's selection
		 */
		addMarkers : function(model, answers, answerID) {
			
			var questionLabel = Products.getQuestionLabel(model, answerID);
			var answerType = Products.getAnswerType(model, answerID);
			
			var markers = new L.MarkerClusterGroup({
				spiderfyOnMaxZoom: false, 
				showCoverageOnHover: true, 
				zoomToBoundsOnClick: true
			});

			markers.on('clusterclick', function (a) {
				a.layer.zoomToBounds();
			});
			
			for (var i = 0 ; i < answers.length ; i++) {
				console.log(answers[i].data);
				console.log(answers[i].data.question_id);
				var lat = answers[i].meta.location[0];
				var lon = answers[i].meta.location[1];
				var m = new L.Marker(new L.LatLng(lat, lon));
				var s = '';
				for (var j = 0 ; j < answers[i].data.length ; j++) {
					if (answers[i].data[j].question_id == answerID) {
						s += '<b>' + questionLabel + ':</b> ';
						if (answerType == 'multiple_choice') {
							switch(answers[i].data[j]['answer']) {
								case 0: s += 'Low'; break;
								case 1: s += 'Medium'; break;
								case 2: s += 'High'; break;
							}
						} else {
							s += answers[i].data[j]['answer'];
						}
					}
				}
				m.bindPopup(s);
				markers.addLayer(m);
			}
			
			Products.map.addLayer(markers);
			
		},
		
		getQuestionLabel : function(model, answerID) {
			for (var i = 0 ; i < model.model_questions.length ; i++) {
				if (model.model_questions[i].question_number == answerID) {
					return model.model_questions[i][ModelsWebPortal.lang + '_indicator'];
				}
			}
		},
		
		getAnswerType : function(model, answerID) {
			for (var i = 0 ; i < model.model_questions.length ; i++) {
				if (model.model_questions[i].question_number == answerID) {
					return model.model_questions[i].answer_type;
				}
			}
		}
		
	}
	
}