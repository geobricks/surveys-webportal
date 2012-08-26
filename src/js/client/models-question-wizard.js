if (!window.ModelsQuestionWizard) {
	
	window.ModelsQuestionWizard = {
			
		model : null,
		
		questionNumber : 1,
		
		languages : [
	                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='/resources/images/gb.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>English</span></div>", title: 'English', value: 'en' },
	                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='/resources/images/fr.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>François</span></div>", title: 'François', value: 'fr' },
	                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='/resources/images/es.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>Español</span></div>", title: 'Español', value: 'es' },
	                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='/resources/images/it.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>Italiano</span></div>", title: 'Italiano', value: 'it' },
	                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='/resources/images/pt.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>Português</span></div>", title: 'Português', value: 'pt' }
	                ],
	                
	    questionHTML : '<tr><td colspan="3" style="font-family: sans-serif; font-size: 12px; color: #46A3CA; font-weight: bold; width: 60%;">Question</td></tr><tr id="questionRow"><td colspan="3"><textarea rows="5" cols="107" id="question"></textarea></td></tr>',
		
	    initUI : function(model, questionNumber) {
	    	
	    	console.log('questionNumber? ' + questionNumber);
	    	
	    	ModelsQuestionWizard.model = model;
	    	ModelsQuestionWizard.questionNumber = questionNumber;
	    	
	    	$('#questionArea').load('single-question.html', function() {
	    		ModelsQuestionWizard.initElements();
	    	});
	    	
	    },
	    
	    initElements : function() {
			
			try {
				document.getElementById('currentModelName').innerHTML = (ModelsQuestionWizard.model[0]).title;
				document.getElementById('currentModelDescription').innerHTML = (ModelsQuestionWizard.model[0]).description;
			} catch(err) {
				document.getElementById('currentModelName').innerHTML = ModelsQuestionWizard.model.title;
				document.getElementById('currentModelDescription').innerHTML = ModelsQuestionWizard.model.description;
			}
			
			$(".model-manager-button").jqxButton({ 
				width: '150', 
				theme: ModelsWebPortal.theme 
			});
			
			$(".model-manager-button-i18n").jqxButton({ 
				width: '200', 
				theme: ModelsWebPortal.theme 
			});
			
			var answerTypes = [$.i18n.prop("type_please_select"), 
			                   $.i18n.prop("type_text"),
			                   $.i18n.prop("type_numeric_value"),
			                   $.i18n.prop("type_date"), 
			                   $.i18n.prop("type_multiple_choice")];
			
			$("#listAnswerTypes").jqxDropDownList({ 
				source: answerTypes, 
				selectedIndex: 0, 
				width: '768', 
				height: '25px', 
				theme: ModelsWebPortal.theme
			});
			
			$("#listTranslateQuestion").jqxDropDownList({ 
				source: ModelsQuestionWizard.languages, 
				selectedIndex: 1, 
				width: '150px', 
				height: '25px', 
				theme: ModelsWebPortal.theme
			});
			
			$("#listTranslateQuestion").bind('change', function(e) {
				$("#questionRow").after(ModelsQuestionWizard.questionHTML);
			});
			
			// set language on the drop-down
			var defaultLanguage = '';
			try {
				defaultLanguage = (ModelsQuestionWizard.model[0]).defaultLanguage;
			} catch (err) {
				defaultLanguage = ModelsQuestionWizard.model.defaultLanguage;
			}
			switch(defaultLanguage) {
				case 'en': $("#listTranslateQuestion").jqxDropDownList('selectIndex', 0 ); break;
				case 'fr': $("#listTranslateQuestion").jqxDropDownList('selectIndex', 1 ); break;
				case 'es': $("#listTranslateQuestion").jqxDropDownList('selectIndex', 2 ); break;
				case 'it': $("#listTranslateQuestion").jqxDropDownList('selectIndex', 3 ); break;
				case 'pt': $("#listTranslateQuestion").jqxDropDownList('selectIndex', 4 ); break;
			};
			
			$("#buttonNextQuestion").bind('click', function() {
				
				var questionText = $('#question').val();
				console.log('questionText ' + questionText);
				var questionLanguage = $("#listTranslateQuestion").jqxDropDownList('getSelectedItem').value;
				var answerType = $("#listAnswerTypes").jqxDropDownList('getSelectedItem').value;
				var id = null;
				
				try {
					id = (ModelsQuestionWizard.model[0])._id;
				} catch (err) {
					id = ModelsQuestionWizard.model._id;
				}
				
				var payload = {};
				payload.model_id = id;
				payload.answer_type = answerType;
				payload.question_number = ModelsQuestionWizard.questionNumber;
				
				// multilanguage
				switch (questionLanguage) {
					case 'en': payload.en_text = questionText; break;
					case 'es': payload.es_text = questionText; break;
					case 'fr': payload.fr_text = questionText; break;
					case 'it': payload.it_text = questionText; break;
					case 'pt': payload.pt_text = questionText; break;
				}
				
				console.log(payload);
				console.log(JSON.stringify(payload));
				
				$.ajax({
    				
    				type: 'GET',
    				url: 'http://localhost:5000/addQuestion/model?callback=?',
    				dataType: 'jsonp',
    				jsonp: 'callback',
    				data: payload,
    				
    				success : function(response) {
    					$("#container").load("questions-manager.html", function() {
    						QuestionsManager.init(payload.model_id, (1 + payload.questionNumber));
    					});
    				}
    				
				});
				
			});
			
			$("#buttonDeleteTranslation").attr('value', $.i18n.prop("buttonDeleteTranslation"));
			$("#buttonAddTranslation").attr('value', $.i18n.prop("buttonAddTranslation"));
			document.getElementById("current_model").innerHTML = $.i18n.prop("current_model");
			document.getElementById("model_description").innerHTML = $.i18n.prop("model_description");
			document.getElementById("question_label").innerHTML = $.i18n.prop("question_label");
			document.getElementById("answer_type").innerHTML = $.i18n.prop("answer_type");
		
		},
		
		payload : null
	
	}
	
}