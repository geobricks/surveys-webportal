if (!window.QuestionsManager) {
	
	window.QuestionsManager = {
			
		modelID : null,
		
		init : function(modelID) {
			
			QuestionsManager.modelID = modelID;
			
			$(".survey-manager-button").jqxButton({ 
				width: '150', 
				theme: SurveysWebPortal.theme 
			});
			
			$("#buttonCreateNewQuestion").bind('click', function () {
				
				$.ajax({
    				
    				type: 'GET',
    				url: 'http://localhost:3000/select/model/' + QuestionsManager.modelID + '?callback=?',
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
			
			$.ajax({
				
				type: 'GET',
				url: 'http://localhost:3000/select/model/' + QuestionsManager.modelID + '?callback=?',
				dataType: 'jsonp',
				jsonp: 'callback',
				
				success : function(response) {
					console.log(response[0].questions);
					
					var questions = response[0].questions;
					var data = new Array();
					for (var i = 0 ; i < questions.length ; i++) {
						var row = {};
						row["model_id"] = questions[i].model_id;
						row["questionText"] = questions[i].questionText;
						row["questionLanguage"] = questions[i].questionLanguage;
						row["answerType"] = questions[i].answerType;
						data[i] = row;
					}
					var source = {
						localdata: data,
		                datatype: "array"
		            };
					var dataAdapter = new $.jqx.dataAdapter(source);
					$("#questions-grid").jqxGrid({
		            	width: 780,
		                height: 250,
		                source: dataAdapter,
		                columnsresize: true,
		                showheader: true,
		                sortable: true,
		                enablehover: true,
		                columns: [
		                   {text: 'Question', datafield: 'questionText'},
		                   {text: 'Language', datafield: 'questionLanguage'},
		                   {text: 'Answer Type', datafield: 'answerType'}
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