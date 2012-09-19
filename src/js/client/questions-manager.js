if (!window.QuestionsManager) {
	
	window.QuestionsManager = {
			
		modelID : null,
		
		init : function(modelID) {
			
			QuestionsManager.modelID = modelID;
			
			$(".model-manager-button").jqxButton({ 
				width: '100%', 
				theme: ModelsWebPortal.theme 
			});
			
			$("#buttonCreateNewQuestion").bind('click', function () {
				
				$.ajax({
    				
    				type: 'GET',
    				url: 'http://localhost:3000/select/model/' + QuestionsManager.modelID + '?callback=?',
    				dataType: 'jsonp',
    				jsonp: 'callback',
    				
    				success : function(models) {
    					var questions = 1 + ($('#questions-grid').jqxGrid('getrows')).length;
    					if (questions == null)
    						questions = 1;
    					document.getElementById('container').innerHTML = '';
    					$("#container").load("models-question-wizard.html", function() {
							ModelsQuestionWizard.initUI(models, questions);
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
					
					var questions = response.model_questions;
					var data = new Array();
					
					if (questions != null) {
						for (var i = 0 ; i < questions.length ; i++) {
							var row = {};
							row["questionNumber"] = questions[i].question_number;
							row["model_id"] = questions[i].model_id;
							switch (questions[i].answer_type) {
								case 'single_value_text': row["answerType"] = $.i18n.prop("type_text"); break;
								case 'single_value_date': row["answerType"] = $.i18n.prop("type_date"); break;
								case 'single_value_number': row["answerType"] = $.i18n.prop("type_numeric_value"); break;
								case 'single_value_boolean': row["answerType"] = $.i18n.prop("type_boolean"); break;
								case 'multiple_choice': row["answerType"] = $.i18n.prop("type_multiple_choice"); break;
							};
							row["questionText"] = questions[i][ModelsWebPortal.lang + "_text"];
							row["questionDescription"] = questions[i][ModelsWebPortal.lang + "_info"];
							if (row["questionText"] == null) {
								row["questionText"] = questions[i].en_text;
							}
							if (row["questionDescription"] == null) {
								row["questionDescription"] = questions[i].en_info;
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
		            	width: '100%',
		                height: '200',
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
			
			// delete a question from the model
			$("#buttonDeleteSelectedQuestion").bind('click', function () {
				
				var selectedRowIndex = $("#questions-grid").jqxGrid('getselectedrowindex');
				var rows = $('#questions-grid').jqxGrid('getrows');
				var row = rows[selectedRowIndex];
				var modelID = row.model_id;
				var questionID = row.questionNumber;
				
				ModelsWebPortal.openWindow("Info", "Please confirm that you want to delete question '" + questionID + "' ", function() {
					
					$("#window").dialog("close");
					
					QuestionsManager.deleteQuestionFromModel(modelID, questionID, selectedRowIndex);
					
					
				
				}, function() {
					
					$("#window").dialog("close");
					
					var rowscount = $("#questions-grid").jqxGrid('getdatainformation').rowscount;
	                if (selectedRowIndex >= 0 && selectedRowIndex < rowscount) {
	                    var id = $("#questions-grid").jqxGrid('getrowid', selectedRowIndex);
	                    $("#questions-grid").jqxGrid('deleterow', id);
	                }
					
				});
				
			});
			
			QuestionsManager.initI18N();
		
		},
		
		initI18N : function() {
			BabelFish.translateButton('buttonCreateNewQuestion');
			BabelFish.translateButton('buttonEditSelectedQuestion');
			BabelFish.translateButton('buttonDeleteSelectedQuestion');
		},
		
		deleteQuestionFromModel : function(modelID, questionID, selectedRowIndex) {
			
			var payload = {};
			payload.model_id = modelID;
			payload.question_id = questionID;
			
			$.ajax({
				
				type: 'GET',
				url: 'http://localhost:3000/remove/question?callback=?',
				dataType: 'jsonp',
				jsonp: 'callback',
				data: payload,
				
				success : function(model) {
					var rowscount = $("#questions-grid").jqxGrid('getdatainformation').rowscount;
	                if (selectedRowIndex >= 0 && selectedRowIndex < rowscount) {
	                    var id = $("#questions-grid").jqxGrid('getrowid', selectedRowIndex);
	                    $("#questions-grid").jqxGrid('deleterow', id);
	                }
				},
				
				error : function(err, b, c) {
					alert(err + ': ' + b + ' - ' + c);
				}
				
			});
			
		}
	
	}
	
}