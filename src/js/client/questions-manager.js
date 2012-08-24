if (!window.QuestionsManager) {
	
	window.QuestionsManager = {
			
		modelID : null,
		
		questionNumber: null,
		
		init : function(modelID, questionNumber) {
			
			QuestionsManager.modelID = modelID;
			QuestionsManager.questionNumber = questionNumber;
			
			$(".survey-manager-button").jqxButton({ 
				width: '200', 
				theme: SurveysWebPortal.theme 
			});
			
			$("#buttonCreateNewQuestion").attr('value', $.i18n.prop("buttonCreateNewQuestion"));
			$("#buttonEditSelectedQuestion").attr('value', $.i18n.prop("buttonEditSelectedQuestion"));
			$("#buttonDeleteSelectedQuestion").attr('value', $.i18n.prop("buttonDeleteSelectedQuestion"));
			
			$("#buttonCreateNewQuestion").bind('click', function () {
				
				$.ajax({
    				
    				type: 'GET',
    				url: 'http://localhost:3000/select/model/' + QuestionsManager.modelID + '?callback=?',
    				dataType: 'jsonp',
    				jsonp: 'callback',
    				
    				success : function(models) {
    					document.getElementById('container').innerHTML = '';
    					$("#container").load("surveys-question-wizard.html", function() {
							SurveysQuestionWizard.initUI(models, QuestionsManager.questionNumber);
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
					
					var questions = response[0].questions;
					var data = new Array();
					
					if (questions != null) {
						for (var i = 0 ; i < questions.length ; i++) {
							var row = {};
							row["questionNumber"] = questions[i].questionNumber;
							row["model_id"] = questions[i].model_id;
							row["questionText"] = questions[i].questionText;
							row["questionLanguage"] = questions[i].questionLanguage;
							row["answerType"] = questions[i].answerType;
							data[i] = row;
						}
					}
					
					var source = {
						localdata: data,
		                datatype: "array"
		            };
					var dataAdapter = new $.jqx.dataAdapter(source);
					$("#questions-grid").jqxGrid({
		            	width: 768,
		                height: 250,
		                source: dataAdapter,
		                columnsresize: true,
		                showheader: true,
		                sortable: true,
		                enablehover: true,
		                columns: [
		                   {text: '#', datafield: 'questionNumber'},
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