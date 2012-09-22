if (!window.Products) {
	
	window.Products = {
			
		map : null,
		
		icons : [],
		
		markers : null,
		
		init : function() {
			
			/**
			 * Initiate the tabs panel
			 */
			$('#products_tab').jqxTabs({ 
				width: '960px', 
				height: 450, 
				position: 'top', 
				animationType: 'fade',
				selectionTracker: true,
				theme: ModelsWebPortal.theme 
			});
			
			/**
			 * Initiate buttons
			 */
			$(".model-manager-button").jqxButton({ 
				width: '100%', 
				theme: ModelsWebPortal.theme 
			});
			
			/**
			 * Test maps
			 */
			Maps.initMap();
			
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
            	console.log('model? ' + modelID);
            	$.ajax({
    				
    				type: 'GET',
    				url: 'http://localhost:3000/select/answer/' + modelID + '?callback=?',
    				dataType: 'jsonp',
    				jsonp: 'callback',
    				
    				/**
    				 * Show the answers on the map
    				 */
    				success : function(answers) {
    					console.log(model);
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
    						Maps.initMap(model, answers);
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
			 * Fill the drop-down with available models
			 */
			$.ajax({
				
				type: 'GET',
				url: 'http://localhost:3000/select/model/*?callback=?',
				dataType: 'jsonp',
				jsonp: 'callback',
				
				success : function(response) {
					
					var data = []
//					
					var row = {};
					row.id = null;
					row.value = $.i18n.prop('_type_please_select');
					row.model = null;
					data[0] = row;
					
					for (var i = 0 ; i < response.length ; i++) {
						var row = {};
						var name_key = ModelsWebPortal.lang + "_name";
						row.id = response[i]._id;
						row.value = response[i][name_key];
						row.model = response[i];
						data[1 + i] = row;
					}
					
					$("#models-grid").jqxDropDownList({ 
						source: data,
						selectedIndex: 0, 
						width: '100%', 
						height: '25', 
						theme: ModelsWebPortal.theme 
					});
					
					$("#models-grid").jqxDropDownList('selectIndex', 0 ); 
					
					$("#models-grid").bind('change', function() {
						var item = ($("#models-grid").jqxDropDownList('getSelectedItem')).originalItem;
						Products.fillAnswersList(item.model, item.id);
					});
					
				},
				
				error : function(err, b, c) {
					alert(err.status + ", " + b + ", " + c);
				}
				
			});
			
			
			/**
			 * Translate elements
			 */
			Products.initI18N();
			
		},
		
		fillAnswersList : function(model, code) {
			
			var data = []

			var row = {};
			row.value = $.i18n.prop('_type_please_select');
			row.id = null;
			data[0] = row;
			
			for (var i = 0 ; i < model.model_questions.length ; i++) {
				var row = {};
				var name_key = ModelsWebPortal.lang + "_text";
				row.value = model.model_questions[i][name_key];
				row.id = model.model_questions[i].question_number;
				data[1 + i] = row;
			}
			
			$("#questions-list").jqxDropDownList({ 
				source: data,
				selectedIndex: 0, 
				width: '100%', 
				height: '25', 
				theme: ModelsWebPortal.theme 
			});
			
			$("#questions-list").jqxDropDownList('selectIndex', 0 ); 
			
			$("#questions-list").bind('change', function() {
				var item = ($("#questions-list").jqxDropDownList('getSelectedItem')).originalItem;
				Products.showMarkers(model, item.id);
			});
			
		},
		
		showMarkers : function(model, answerID) {
			
			$.ajax({
				
				type: 'GET',
				url: 'http://localhost:3000/select/answer/' + model._id + '?callback=?',
				dataType: 'jsonp',
				jsonp: 'callback',
				
				success : function(answers) {
					Maps.initIcons();
					Maps.addMarkers(model, answers, answerID);
				},
				
				error : function(err, b, c) {
					alert(err.status + ", " + b + ", " + c);
				}
				
			});
			
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
				console.log(row);
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
				width: '100%', 
				height: '25px', 
				theme: ModelsWebPortal.theme
			});
			
			$("#table_question_selector").bind('change', function() {
				var item = ($("#table_question_selector").jqxDropDownList('getSelectedItem')).originalItem;
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
				width: '100%', 
				height: '25px', 
				theme: ModelsWebPortal.theme
			});
			
			$("#chart_type_selector").jqxDropDownList({ 
				source: chart_type_adapter, 
				displayMember: "label", 
				valueMember: "code",
				selectedIndex: 0, 
				width: '100%', 
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
							tmp.frequency = parseInt(freqs[i]);
							data.push(tmp);
						}
					}
					
					var source = {
						localdata: data,
			            datatype: "array"
					};
						
					var dataAdapter = new $.jqx.dataAdapter(source);

					$("#table").jqxGrid({
						width: '100%',
						height: '200',
						source: dataAdapter,
						columnsresize: true,
						showheader: true,
						sortable: true,
						enablehover: true,
						columns: [
						          {text: $.i18n.prop('question'), datafield: 'question'},
						          {text: $.i18n.prop('answer'), datafield: 'answer'},
						          {text: $.i18n.prop('frequency'), datafield: 'frequency', cellsformat: 'd'}
			                ],
			            theme: ModelsWebPortal.theme
					});
					
					/**
					 * Focus on the product
					 */
					$('html,body').animate({
						scrollTop: $("#table").offset().top
					},'slow');
					
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
					
					/**
					 * Focus on the product
					 */
					$('html,body').animate({
						scrollTop: $("#chart").offset().top
					},'slow');
					
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
					
					/**
					 * Focus on the product
					 */
					$('html,body').animate({
						scrollTop: $("#chart").offset().top
					},'slow');
					
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