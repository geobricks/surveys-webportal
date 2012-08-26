if (!window.QuestionsManager) {
	
	window.QuestionsManager = {
			
		modelID : null,
		
		questionNumber: null,
		
		init : function(modelID, questionNumber) {
			
			QuestionsManager.modelID = modelID;
			QuestionsManager.questionNumber = questionNumber;
			
			$(".model-manager-button").jqxButton({ 
				width: '200', 
				theme: ModelsWebPortal.theme 
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
    					$("#container").load("models-question-wizard.html", function() {
							ModelsQuestionWizard.initUI(models, QuestionsManager.questionNumber);
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
					
					var questions = response[0].model_questions;
					var data = new Array();
					
					console.log('questions? ' + questions);
					if (questions != null) {
						console.log(questions.length);
						for (var i = 0 ; i < questions.length ; i++) {
							var row = {};
							row["questionNumber"] = questions[i].question_number;
							row["model_id"] = questions[i].model_id;
							row["answerType"] = questions[i].answer_type;
							switch (ModelsWebPortal.lang) {
								case 'en' :
									row["questionText"] = questions[i].en_text;
									row["questionDescription"] = questions[i].en_description;
								break;
							};
							if (row["questionText"] == null) {
								row["questionText"] = questions[i].en_text;
							}
							if (row["questionDescription"] == null) {
								row["questionDescription"] = questions[i].en_text;
							}
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
		                   {text: 'Description', datafield: 'questionDescription'},
		                   {text: 'Answer Type', datafield: 'answerType'}
		                ],
		                theme: ModelsWebPortal.theme
		            });
					
				},
				
				error : function(err, b, c) {
					alert(err.status + ", " + b + ", " + c);
				}
				
			});
		
		}
	
	}
	
}