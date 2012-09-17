if (!window.Products) {
	
	window.Products = {
			
		map : null,
		
		icons : [],
		
		markers : null,
		
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
				
				/**
				 * Get selected model's ID
				 */
				var rowindex = $('#models-grid').jqxGrid('getselectedrowindex');
            	var rows = $('#models-grid').jqxGrid('getrows');
            	var modelName = rows[rowindex].title;
            	var modelID = rows[rowindex].id;
            	var model = rows[rowindex].model;
            	
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
    					$('#table_container').load('table.html', function() {
    						Products.initTable(model, answers);
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
			 * Show Map button
			 */
			$("#buttonShowChart").bind('click', function() {
				
				/**
				 * Get selected model's ID
				 */
				var rowindex = $('#models-grid').jqxGrid('getselectedrowindex');
            	var rows = $('#models-grid').jqxGrid('getrows');
            	var modelName = rows[rowindex].title;
            	var modelID = rows[rowindex].id;
            	var model = rows[rowindex].model;
            	
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
    					$('#chart_container').load('chart.html', function() {
    						Products.initChart(model, answers);
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
		
		initTable : function(model, answers) {
			
			BabelFish.translateHTML('table_question_selector_label');
			
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
			
			$("#table_question_selector").jqxDropDownList({ 
				source: questions_data_adapter, 
				displayMember: "label", 
				valueMember: "code",
				selectedIndex: 0, 
				width: '688', 
				height: '25px', 
				theme: ModelsWebPortal.theme
			});
			
			$("#table_question_selector").bind('change', function() {
				var item = ($("#table_question_selector").jqxDropDownList('getSelectedItem')).originalItem;
				console.log(model);
				console.log(item.code);
				Products.createTable(model, item.code);
			});
			
		},
		
		initChart : function(model, answers) {
			
			/**
			 * Initiate the UI for charts
			 */
			Products.initChartUI(model, answers);
			
		},
		
		initChartUI : function(model, answers) {
			
			BabelFish.translateHTML('chart_question_selector_label');
			BabelFish.translateHTML('chart_type_selector_label');
			
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
			
			var chart_type = new Array();
			var row = {};
			row['code'] = 'bar';
			row['label'] = $.i18n.prop("chart_bar");
			chart_type[0] = row;
			row = {};
			row['code'] = 'pie';
			row['label'] = $.i18n.prop("chart_pie");
			chart_type[1] = row;
			
			var type_source = {
				localdata: chart_type,
				datatype: "json",
				datafields: [{name: 'code'}, {name: 'label'}],
				id: 'code'
			};
				
			var chart_type_adapter = new $.jqx.dataAdapter(type_source);
			
			$("#chart_question_selector").jqxDropDownList({ 
				source: questions_data_adapter, 
				displayMember: "label", 
				valueMember: "code",
				selectedIndex: 0, 
				width: '688', 
				height: '25px', 
				theme: ModelsWebPortal.theme
			});
			
			$("#chart_type_selector").jqxDropDownList({ 
				source: chart_type_adapter, 
				displayMember: "label", 
				valueMember: "code",
				selectedIndex: 0, 
				width: '688', 
				height: '25px', 
				theme: ModelsWebPortal.theme
			});
			
			$("#chart_question_selector").bind('change', function() {
				var item = ($("#chart_question_selector").jqxDropDownList('getSelectedItem')).originalItem;
				var type = ($("#chart_type_selector").jqxDropDownList('getSelectedItem')).originalItem;
				Products.createChart(model, item.code, type.code);
			});
			
			$("#chart_type_selector").bind('change', function() {
				var item = ($("#chart_question_selector").jqxDropDownList('getSelectedItem')).originalItem;
				var type = ($("#chart_type_selector").jqxDropDownList('getSelectedItem')).originalItem;
				Products.createChart(model, item.code, type.code);
			});
			
		},
		
		createTable : function(model, questionID) {
			
			/**
        	 * Get the frequency of the answers
        	 */
        	$.ajax({
				
				type: 'GET',
				url: 'http://localhost:3000/aggregate/answers/' + model._id + '/' + questionID + '/?callback=?',
				dataType: 'jsonp',
				jsonp: 'callback',
				
				/**
				 * Show the answers on the map
				 */
				success : function(freqs) {
					
					var indicator = model.model_questions[parseInt(questionID) - 1][ModelsWebPortal.lang + '_indicator'];
					var question = model.model_questions[parseInt(questionID) - 1][ModelsWebPortal.lang + '_text'];
					
					var data = new Array();
					var answerType = Products.getAnswerType(model, questionID);
					
					for (var i = 0 ; i < freqs.length ; i++) {
						if (freqs[i] != null) {
							var tmp = new Array();
							tmp.question = question;
							if (answerType == 'multiple_choice') {
								var lbl = model.model_questions[parseInt(questionID) - 1].choices[i][ModelsWebPortal.lang + '_choice_label'];
								tmp.answer = lbl;
							} else {
								tmp.answer = i.toString();
							}
							tmp.frequency = freqs[i];
							data.push(tmp);
						}
					}
					
					var source = {
						localdata: data,
			            datatype: "array"
					};
						
					var dataAdapter = new $.jqx.dataAdapter(source);

					$("#table").jqxGrid({
						width: 765,
						height: 320,
						source: dataAdapter,
						columnsresize: true,
						showheader: true,
						sortable: true,
						enablehover: true,
						columns: [
						          {text: 'Question', datafield: 'question'},
						          {text: 'Answer', datafield: 'answer'},
						          {text: 'Frequency', datafield: 'frequency'}
			                ],
			            theme: "ui-start"
					});
					
				},
				
				/**
				 * Alert the user of the error
				 */
				error : function(err, b, c) {
					alert(err.status + ", " + b + ", " + c);
				}
				
			});			
			
		},
		
		createChart : function(model, questionID, type) {
			switch(type) {
				case 'bar' : Products.createBarChart(model, questionID); break;
				case 'pie' : Products.createPieChart(model, questionID); break;
			}
		},
		
		createPieChart : function(model, questionID) {
			
			/**
        	 * Get the frequency of the answers
        	 */
        	$.ajax({
				
				type: 'GET',
				url: 'http://localhost:3000/aggregate/answers/' + model._id + '/' + questionID + '/?callback=?',
				dataType: 'jsonp',
				jsonp: 'callback',
				
				/**
				 * Show the answers on the map
				 */
				success : function(freqs) {
					
					var categories = new Array();
					var indicator = model.model_questions[parseInt(questionID) - 1][ModelsWebPortal.lang + '_indicator'];
					var question = model.model_questions[parseInt(questionID) - 1][ModelsWebPortal.lang + '_text'];
					var series = Products.createSeries_PIE(model, questionID, freqs);
					console.log(series);
					
					var chart = new Highcharts.Chart({
						
						chart: {
							renderTo: 'chart',
							plotBackgroundColor: null,
			                plotBorderWidth: null,
			                plotShadow: false
				        },
				        
				        credits: {
				        	text: 'GeoBricks.org',
				        	href: 'http://www.geobricks.org/'
				        },
				        
				        title: {
				        	text: question
				        },
				        
				        subtitle: {
				        	text: $.i18n.prop('frequencyOfTheAnswers')
				        },
				        
				        plotOptions: {
			                pie: {
			                    allowPointSelect: true,
			                    cursor: 'pointer',
			                    dataLabels: {
			                        enabled: true,
			                        color: '#000000',
			                        connectorColor: '#000000',
			                        formatter: function() {
			                            return '<b>'+ this.point.name +'</b>: '+ this.percentage.toFixed(4) +' %';
			                        }
			                    }
			                }
			            },
			            
			            series: series
				        
					});
					
					console.log(chart);
					
				},
								
				/**
				 * Alert the user of the error
				 */
				error : function(err, b, c) {
					alert(err.status + ", " + b + ", " + c);
				}
				
			});
        	
		},
		
		/**
		 * Create the data for Highcharts. For 'multiple_choice' questions
		 * the appropriate label is retrieved from the model
		 */
		createSeries_PIE : function(model, questionID, freqs) {
			var answerType = Products.getAnswerType(model, questionID);
			var series = new Array();
			var tmp = new Array();
			tmp.type = 'pie';
			tmp.data = new Array();
			for (var i = 0 ; i < freqs.length ; i++) {
				if (freqs[i] != null) {
					if (answerType == 'multiple_choice') {
						var lbl = model.model_questions[parseInt(questionID) - 1].choices[i][ModelsWebPortal.lang + '_choice_label'];
						tmp.name = lbl;
						tmp.data.push([lbl, freqs[i]]);
					} else {
						tmp.data.push([i.toString(), freqs[i]]);
					}
				}
			}
			series.push(tmp);
			return series;
		},
		
		createBarChart : function(model, questionID) {
			
			/**
        	 * Get the frequency of the answers
        	 */
        	$.ajax({
				
				type: 'GET',
				url: 'http://localhost:3000/aggregate/answers/' + model._id + '/' + questionID + '/?callback=?',
				dataType: 'jsonp',
				jsonp: 'callback',
				
				/**
				 * Show the answers on the map
				 */
				success : function(freqs) {
					
					var categories = new Array();
					var indicator = model.model_questions[parseInt(questionID) - 1][ModelsWebPortal.lang + '_indicator'];
					var question = model.model_questions[parseInt(questionID) - 1][ModelsWebPortal.lang + '_text'];
					var series = Products.createSeries_BAR(model, questionID, freqs);
					
					var chart = new Highcharts.Chart({
						
						chart: {
							renderTo: 'chart',
				            type: 'column',
				            height: 350
				        },
				        
				        credits: {
				        	text: 'GeoBricks.org',
				        	href: 'http://www.geobricks.org/'
				        },
				        
				        title: {
				        	text: question
				        },
				        
				        subtitle: {
				        	text: $.i18n.prop('frequencyOfTheAnswers')
				        },
				        
				        xAxis: {
				        	categories: [indicator]
				        },
				        
				        yAxis: {
				        	allowDecimals: false,
				        	min: 0,
				        	title: {
				        		text: $.i18n.prop('frequency')
				        	}
				        },
				        
				        series: series
				        
					});
					
				},
				
				/**
				 * Alert the user of the error
				 */
				error : function(err, b, c) {
					alert(err.status + ", " + b + ", " + c);
				}
				
			});
        	
		},
		
		/**
		 * Create the data for Highcharts. For 'multiple_choice' questions
		 * the appropriate label is retrieved from the model
		 */
		createSeries_BAR : function(model, questionID, freqs) {
			var answerType = Products.getAnswerType(model, questionID);
			var series = new Array();
			for (var i = 0 ; i < freqs.length ; i++) {
				if (freqs[i] != null) {
					var tmp = new Array();
					if (answerType == 'multiple_choice') {
						var lbl = model.model_questions[parseInt(questionID) - 1].choices[i][ModelsWebPortal.lang + '_choice_label'];
						tmp.name = lbl;
					} else {
						tmp.name = i.toString();
					}
					tmp.data = new Array();
					tmp.data[0] = freqs[i];
					series.push(tmp);
				}
			}
			return series;
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
			
			Products.initIcons();
			
		},
		
		initIcons : function() {
			
			var redIcon = L.icon({
				iconUrl: '../resources/js/leaflet/0.4.4/images/red.png',
			    shadowUrl: '../resources/js/leaflet/0.4.4/images/no-shadow.png',
			    iconSize:     [32, 32], // size of the icon
			    shadowSize:   [41, 41], // size of the shadow
			    iconAnchor:   [5, 32], // point of the icon which will correspond to marker's location
			    shadowAnchor: [4, 62],  // the same for the shadow
			    popupAnchor:  [0, -28] // point from which the popup should open relative to the iconAnchor
			});
			Products.icons[0] = redIcon;
			
			var yellowIcon = L.icon({
				iconUrl: '../resources/js/leaflet/0.4.4/images/yellow.png',
			    shadowUrl: '../resources/js/leaflet/0.4.4/images/no-shadow.png',
			    iconSize:     [32, 32], // size of the icon
			    shadowSize:   [41, 41], // size of the shadow
			    iconAnchor:   [5, 32], // point of the icon which will correspond to marker's location
			    shadowAnchor: [4, 62],  // the same for the shadow
			    popupAnchor:  [0, -28] // point from which the popup should open relative to the iconAnchor
			});
			Products.icons[1] = yellowIcon;
			
			var greenIcon = L.icon({
				iconUrl: '../resources/js/leaflet/0.4.4/images/green.png',
			    shadowUrl: '../resources/js/leaflet/0.4.4/images/no-shadow.png',
			    iconSize:     [32, 32], // size of the icon
			    shadowSize:   [41, 41], // size of the shadow
			    iconAnchor:   [5, 32], // point of the icon which will correspond to marker's location
			    shadowAnchor: [4, 62],  // the same for the shadow
			    popupAnchor:  [0, -28] // point from which the popup should open relative to the iconAnchor
			});
			Products.icons[2] = greenIcon;
			
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
			
			/**
			 * Add full screen features
			 */
			var fullScreen = new L.Control.FullScreen();
			Products.map.addControl(fullScreen);
			Products.map.on('enterFullscreen', function(){
			if(window.console) window.console.log('enterFullscreen');
			
			});
			Products.map.on('exitFullscreen', function(){
			if(window.console) window.console.log('exitFullscreen');
			
			});
			
			/**
			 * Initiate Open Street Map
			 */
			var osm = L.tileLayer('http://{s}.tile.cloudmade.com/17ad8466b1c24b86b173b2a1d5492115/997/256/{z}/{x}/{y}.png', {
				attribution: 'GeoBricks.org',
				maxZoom: 17
			});
			
			/**
			 * Initiate other providers
			 */
			var ggl = new L.Google();
			var bing = new L.BingLayer("Anqm0F_JjIZvT0P3abS6KONpaBaKuTnITRrnYuiJCE0WOhH6ZbE4DzeT6brvKVR5");
			Products.map.addLayer(ggl);
			Products.map.addLayer(bing);
			Products.map.addLayer(osm);
			
			/**
			 * Add maps provider switch
			 */
			Products.map.addControl(new L.Control.Layers( {'Google':ggl, 'Bing':bing, 'Open Street Map ':osm}, {}));
			
		},
		
		/**
		 * Show markers on the map according to user's selection
		 */
		addMarkers : function(model, answers, answerID) {
			
			/**
			 * Remove existing markers, if any
			 */
			if (Products.map.markers != null) {
				Products.map.removeLayer(Products.map.markers);
			}
			
			/**
			 * Get the question label and type from the model
			 */
			var questionLabel = Products.getQuestionLabel(model, answerID);
			var answerType = Products.getAnswerType(model, answerID);
			
			/**
			 * Initiate the cluster
			 */
			Products.map.markers = new L.MarkerClusterGroup({
				spiderfyOnMaxZoom: false, 
				showCoverageOnHover: true, 
				zoomToBoundsOnClick: true
			});

			Products.map.markers.on('clusterclick', function (a) {
				a.layer.zoomToBounds();
			});
			
			for (var i = 0 ; i < answers.length ; i++) {
				
				/**
				 * Get the answer location
				 */
				var lat = answers[i].meta.location[0];
				var lon = answers[i].meta.location[1];
				
				/**
				 * Custom marker
				 */
				var m = null;
				if (answerType == 'multiple_choice') {
					
				} else {
					m = new L.Marker(new L.LatLng(lat, lon));
				}
				
				/**
				 * Popup text
				 */
				var s = '';
				for (var j = 0 ; j < answers[i].data.length ; j++) {
					
					/**
					 * If this is a multiple choices question we need to
					 * add custom markers to the map, otherwise we'll use
					 * the standard blue one
					 */
					if (answers[i].data[j].question_id == answerID) {
						
						/**
						 * Add the question to the pop-up
						 */
						s += '<b>' + questionLabel + ':</b><br>';
						
						if (answerType == 'multiple_choice') {
							
							/**
							 * Answer value is used to get the answer's label 
							 * and the marker
							 */
							var idx = answers[i].data[j]['answer'];
							s += model.model_questions[j].choices[idx][ModelsWebPortal.lang + '_choice_label'];
							m = new L.Marker(new L.LatLng(lat, lon), {icon: Products.icons[idx]});
							
						} else {
							
							s += answers[i].data[j]['answer'];
							
						}
						
					}
					
				}
				
				/**
				 * Bind the pop-up to the marker and
				 * add the marker to the layer
				 */
				m.bindPopup(s);
				Products.map.markers.addLayer(m);
			}
			
			Products.map.addLayer(Products.map.markers);
			
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
		},
		
		clear : function() {
			document.getElementById('map_container').innerHTML = '';
			document.getElementById('chart_container').innerHTML = '';
			document.getElementById('table_container').innerHTML = '';
		}
		
	}
	
}