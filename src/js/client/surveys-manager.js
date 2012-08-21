if (!window.SurveysManager) {
	
	window.SurveysManager = {
		
		initUI : function() {
			
			$(".survey-manager-button").jqxButton({ 
				width: '150', 
				theme: SurveysWebPortal.theme 
			});
			
			SurveysManager.findAllModels();
            
            $("#buttonDeleteSelectedSurvey").bind('click', function () {
            	
            	var rowindex = $('#surveys-grid').jqxGrid('getselectedrowindex');
            	var rows = $('#surveys-grid').jqxGrid('getrows');
            	var surveyName = rows[rowindex].title;
            	var surveyID = rows[rowindex].id;
            	            	
            	SurveysWebPortal.openWindow("Info", "Are you sure you want to delete survey '" + surveyName + "'?", function() {
            		
            		$.ajax({
    					
						type: 'GET',
						url: 'http://localhost:3000/delete/model/' + surveyID + '?callback=?',
						dataType: 'jsonp',
						jsonp: 'callback',
						
						success : function(response) {
							$("#window").dialog("close");
							SurveysWebPortal.openWindow("Info", "Model '" + surveyName + "' has been deleted from the DB.", function() {
								$("#window").dialog("close");
							});
							SurveysManager.findAllModels();
						},
						
						error : function(err, b, c) {
							alert(err.status + ", " + b + ", " + c);
						}
					
	            	});
            		
            	});
            	
			});
            
            $("#buttonCreateNewSurvey").bind('click', function () {
            	document.getElementById('container').innerHTML = '';
				$("#container").load("surveys-survey-wizard.html", function() {
					SurveysSurveyWizard.initUI();
				});
            });
            
            $("#buttonEditSelectedSurvey").bind('click', function () {
            	
            	var rowindex = $('#surveys-grid').jqxGrid('getselectedrowindex');
            	var rows = $('#surveys-grid').jqxGrid('getrows');
            	var surveyID = rows[rowindex].id;
            	
            	console.log('http://localhost:3000/select/model/' + surveyID + '?callback=?');
            	
            	$.ajax({
    				
    				type: 'GET',
    				url: 'http://localhost:3000/select/model/' + surveyID + '?callback=?',
//    				url: 'http://localhost:3000/select/model/' + rows[rowindex].title + '?callback=?',
    				dataType: 'jsonp',
    				jsonp: 'callback',
    				
    				success : function(models) {
    					console.log(models);
    					document.getElementById('container').innerHTML = '';
    					$("#container").load("surveys-question-wizard.html", function() {
							SurveysQuestionWizard.initUI(models);
						});
    				},
    				
    				error : function(err, b, c) {
    					alert(err.status + ", " + b + ", " + c);
    				}
    				
            	});
            	
            });
		
		},
		
		findAllModels : function() {
			
			$.ajax({
				
				type: 'GET',
				url: 'http://localhost:3000/select/model/*?callback=?',
				dataType: 'jsonp',
				jsonp: 'callback',
				
				success : function(response) {
					var data = new Array();
					for (var i = 0 ; i < response.length ; i++) {
						var row = {};
						row["id"] = response[i]._id;
						row["title"] = response[i].title;
						row["defaultLanguage"] = response[i].defaultLanguage;
						row["dateLastUpdate"] = response[i].dateLastUpdate.substring(0, 10) + " (" + response[i].dateLastUpdate.substring(11, 19) + ")";
						row["creationDate"] = response[i].creationDate.substring(0, 10) + " (" + response[i].creationDate.substring(11, 19) + ")";
						row["description"] = response[i].description;
						data[i] = row;
					}
					var source = {
						localdata: data,
		                datatype: "array"
		            };
					var dataAdapter = new $.jqx.dataAdapter(source);
					$("#surveys-grid").jqxGrid({
		            	width: 780,
		                height: 250,
		                source: dataAdapter,
		                columnsresize: true,
		                showheader: true,
		                sortable: true,
		                enablehover: true,
		                columns: [
		                   {text: 'Survey Name', datafield: 'title'},
		                   {text: 'Description', datafield: 'description', width: 300},
		                   {text: 'Language', datafield: 'defaultLanguage'},
		                   {text: 'Date Last Update', datafield: 'dateLastUpdate', cellsformat: 'Y-m-d'},
		                   {text: 'Creation Date', datafield: 'creationDate', cellsformat: 'Y-m-d'}
		                ],
		                theme: SurveysWebPortal.theme
		            });
				},
				
				error : function(err, b, c) {
					alert(err.status + ", " + b + ", " + c);
				}
				
			});

		}
	
	}
	
}