if (!window.SurveysQuestionWizard) {
	
	window.SurveysQuestionWizard = {
			
		model : null,
		
		questionNumber : 1,
		
		answerTypes : ['Please Select...', 'Text', 'Numeric Value', 'Date', 'Multiple Choice'],
		
		languages : [
	                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='/resources/images/gb.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>English</span></div>", title: 'English', value: 'en' },
	                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='/resources/images/fr.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>François</span></div>", title: 'François', value: 'fr' },
	                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='/resources/images/es.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>Español</span></div>", title: 'Español', value: 'es' },
	                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='/resources/images/it.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>Italiano</span></div>", title: 'Italiano', value: 'it' },
	                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='/resources/images/pt.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>Português</span></div>", title: 'Português', value: 'pt' }
	                ],
	                
	    questionHTML : '<tr><td colspan="3" style="font-family: sans-serif; font-size: 12px; color: #46A3CA; font-weight: bold; width: 60%;">Question</td></tr><tr id="questionRow"><td colspan="3"><textarea rows="5" cols="107" id="question"></textarea></td></tr>',
		
	    initUI : function(model) {
	    	
	    	SurveysQuestionWizard.model = model;
	    	
	    	$('#questionArea').load('single-question.html', function() {
	    		SurveysQuestionWizard.initElements();
	    	});
	    	
	    },
	    
	    initElements : function() {
			
			try {
				document.getElementById('currentModelName').innerHTML = (SurveysQuestionWizard.model[0]).title;
				document.getElementById('currentModelDescription').innerHTML = (SurveysQuestionWizard.model[0]).description;
			} catch(err) {
				document.getElementById('currentModelName').innerHTML = SurveysQuestionWizard.model.title;
				document.getElementById('currentModelDescription').innerHTML = SurveysQuestionWizard.model.description;
			}
			
			$(".survey-manager-button").jqxButton({ 
				width: '150', 
				theme: SurveysWebPortal.theme 
			});
			
			$(".survey-manager-button-i18n").jqxButton({ 
				width: '200', 
				theme: SurveysWebPortal.theme 
			});
			
			$("#listAnswerTypes").jqxDropDownList({ 
				source: SurveysQuestionWizard.answerTypes, 
				selectedIndex: 0, 
				width: '770', 
				height: '25px', 
				theme: SurveysWebPortal.theme
			});
			
			$("#listTranslateQuestion").jqxDropDownList({ 
				source: SurveysQuestionWizard.languages, 
				selectedIndex: 1, 
				width: '150px', 
				height: '25px', 
				theme: SurveysWebPortal.theme
			});
			
			$("#listTranslateQuestion").bind('change', function(e) {
				$("#questionRow").after(SurveysQuestionWizard.questionHTML);
			});
			
			// set language on the drop-down
			var defaultLanguage = '';
			try {
				defaultLanguage = (SurveysQuestionWizard.model[0]).defaultLanguage;
			} catch (err) {
				defaultLanguage = SurveysQuestionWizard.model.defaultLanguage;
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
				var questionLanguage = $("#listTranslateQuestion").jqxDropDownList('getSelectedItem').value;
				var answerType = $("#listAnswerTypes").jqxDropDownList('getSelectedItem').value;
				var id = null;
				
				try {
					id = (SurveysQuestionWizard.model[0])._id;
				} catch (err) {
					id = SurveysQuestionWizard.model._id;
				}
				
				var payload = {};
				payload.model_id = id;
				payload.questionText = questionText;
				payload.questionLanguage = questionLanguage;
				payload.answerType = answerType;
				
				$.ajax({
    				
    				type: 'POST',
    				url: 'http://localhost:5000/addQuestion/model',
    				dataType: 'json',
    				data: payload,
    				
    				success : function(response) {
    					console.log(response);
    				}
    				
				});
				
			});
		
		},
		
		payload : null
	
	}
	
}