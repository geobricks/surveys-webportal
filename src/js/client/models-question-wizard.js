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
	    	
	    	ModelsQuestionWizard.model = model;
	    	ModelsQuestionWizard.questionNumber = questionNumber;
	    	
	    	$('#questionArea').load('single-question.html', function() {
	    		ModelsQuestionWizard.initElements();
	    	});
	    	
	    },
	    
	    initI18N : function(count) {
			
	    	BabelFish.translateHTML('current_model');
			BabelFish.translateHTML('model_description');
			BabelFish.translateHTML('answer_type');
			
	    	BabelFish.translateButtonWithLabel('buttonDeleteTranslation_' + count, 'buttonDeleteTranslation');
			BabelFish.translateButtonWithLabel('buttonAddTranslation_' + count, 'buttonAddTranslation');
			BabelFish.translateHTMLWithLabel('question_label_' + count, 'question_label');
			BabelFish.translateHTMLWithLabel('question_description_' + count, 'question_description');
			
		},
		
		addTranslationListener : function(id) {
			
			// add new form
			$('#questionTable').last().append(B.build(1));
			
			// create buttons
			$(".model-manager-button-i18n").jqxButton({ 
				width: '200', 
				theme: ModelsWebPortal.theme 
			});
			
			// languages drop-down
			$("#listTranslateQuestion_" + id).jqxDropDownList({ 
				source: ModelsQuestionWizard.languages, 
				selectedIndex: 1, 
				width: '150px', 
				height: '60px', 
				theme: ModelsWebPortal.theme
			});
			
			// bind this function to the new 'Add Translation' button
			$('#buttonAddTranslation_0').bind('click', function() {
				ModelsQuestionWizard.addTranslationListener(1 + id);
			});
			
			// translate labels
			ModelsQuestionWizard.initI18N(id);
			
		},
	    
	    initElements : function(questionNumber) {
			
	    	switch (ModelsWebPortal.lang) {
					default :
						document.getElementById('currentModelName').innerHTML = ModelsQuestionWizard.model.en_name;
						document.getElementById('currentModelDescription').innerHTML = ModelsQuestionWizard.model.en_abstract;
					break;
					case 'es' :
						document.getElementById('currentModelName').innerHTML = ModelsQuestionWizard.model.es_name;
						document.getElementById('currentModelDescription').innerHTML = ModelsQuestionWizard.model.es_abstract;
					break;
					case 'fr' :
						document.getElementById('currentModelName').innerHTML = ModelsQuestionWizard.model.fr_name;
						document.getElementById('currentModelDescription').innerHTML = ModelsQuestionWizard.model.fr_abstract;
					break;
					case 'pt' :
						document.getElementById('currentModelName').innerHTML = ModelsQuestionWizard.model.pt_name;
						document.getElementById('currentModelDescription').innerHTML = ModelsQuestionWizard.model.pt_abstract;
					break;
					case 'it' :
						document.getElementById('currentModelName').innerHTML = ModelsQuestionWizard.model.it_name;
						document.getElementById('currentModelDescription').innerHTML = ModelsQuestionWizard.model.it_abstract;
					break;
				};
			
			$(".model-manager-button").jqxButton({ 
				width: '150', 
				theme: ModelsWebPortal.theme 
			});
			
			$(".model-manager-button-i18n").jqxButton({ 
				width: '200', 
				theme: ModelsWebPortal.theme 
			});
			
			/**
			 * Append a new form to translate the question
			 */
			$('#buttonAddTranslation_0').bind('click', function() {
				ModelsQuestionWizard.addTranslationListener(1);
			});
			
			$("#buttonSummaryQuestion").bind('click', function() {
	    		var id = ModelsQuestionWizard.model._id;
	    		$("#container").load("questions-manager.html", function() {
					QuestionsManager.init(id);
				});
	    	});
			
			// answer types
			var answer_type_data = new Array();
			var row = {};
			row['code'] = null;
			row['label'] = $.i18n.prop("type_please_select");
			answer_type_data[0] = row;
			row = {};
			row['code'] = 'single_value_text';
			row['label'] = $.i18n.prop("type_text");
			answer_type_data[1] = row;
			row = {};
			row['code'] = 'single_value_date';
			row['label'] = $.i18n.prop("type_date");
			answer_type_data[2] = row;
			row = {};
			row['code'] = 'single_value_number';
			row['label'] = $.i18n.prop("type_numeric_value");
			answer_type_data[3] = row;
			row = {};
			row['code'] = 'multiple_choice';
			row['label'] = $.i18n.prop("type_multiple_choice");
			answer_type_data[4] = row;
			
			var answer_type_source = {
				localdata: answer_type_data,
				datatype: "json",
			    datafields: [{name: 'code'}, {name: 'label'}],
			    id: 'code'
			};
			
			var answer_type_data_adapter = new $.jqx.dataAdapter(answer_type_source);
			
			$("#listAnswerTypes").jqxDropDownList({ 
				source: answer_type_data_adapter, 
				displayMember: "label", 
				valueMember: "code",
				selectedIndex: 0, 
				width: '768', 
				height: '25px', 
				theme: ModelsWebPortal.theme
			});
			
			$(".listTranslateQuestion").jqxDropDownList({ 
				source: ModelsQuestionWizard.languages, 
				selectedIndex: 1, 
				width: '150px', 
				height: '60px', 
				theme: ModelsWebPortal.theme
			});
			
			$(".listTranslateQuestion").bind('change', function(e) {
				$("#questionRow").after(ModelsQuestionWizard.questionHTML);
			});
			
			// set language on the drop-down
			var defaultLanguage = '';
			defaultLanguage = ModelsQuestionWizard.model.model_default_language;
			switch(defaultLanguage) {
				case 'en': $(".listTranslateQuestion").jqxDropDownList('selectIndex', 0 ); break;
				case 'fr': $(".listTranslateQuestion").jqxDropDownList('selectIndex', 1 ); break;
				case 'es': $(".listTranslateQuestion").jqxDropDownList('selectIndex', 2 ); break;
				case 'it': $(".listTranslateQuestion").jqxDropDownList('selectIndex', 3 ); break;
				case 'pt': $(".listTranslateQuestion").jqxDropDownList('selectIndex', 4 ); break;
			};
			
			$("#buttonNextQuestion").bind('click', function() {
				
				var counter = 0;
				var payload = {};
				
				// iterate to get all the (possible) translations of the questions
				while ($('#question_' + counter).val() != null) {
					
					var questionText = $('#question_' + counter).val();
					var questionInfo = $('#info_' + counter).val();
					var questionLanguage = $("#listTranslateQuestion_" + counter).jqxDropDownList('getSelectedItem').value;
					var answerType = $("#listAnswerTypes").jqxDropDownList('getSelectedItem').value;
					var id = ModelsQuestionWizard.model._id; 
					
					payload.model_id = id;
					payload.answer_type = answerType;
					payload.question_number = ModelsQuestionWizard.questionNumber;
					
					// multilanguage
					switch (questionLanguage) {
						default: 
							payload.en_text = questionText; 
							payload.en_info = questionInfo;
						break;
						case 'es': 
							payload.es_text = questionText;
							payload.es_info = questionInfo;
						break;
						case 'fr': 
							payload.fr_text = questionText;
							payload.fr_info = questionInfo;
						break;
						case 'it': 
							payload.it_text = questionText;
							payload.it_info = questionInfo;
						break;
						case 'pt': 
							payload.pt_text = questionText;
							payload.pt_info = questionInfo;
						break;
					}
					
					counter++;
				
				}
				
				console.log(payload);
				
				$.ajax({
    				
    				type: 'GET',
    				url: 'http://localhost:5000/addQuestion/model?callback=?',
    				dataType: 'jsonp',
    				jsonp: 'callback',
    				data: payload,
    				
    				success : function(response) {
    					ModelsQuestionWizard.questionNumber = 1 + ModelsQuestionWizard.questionNumber;
    			    	$('#questionArea').load('single-question.html', function() {
    			    		ModelsQuestionWizard.initElements();
    			    	});
    				}
    				
				});
				
			});
			
			ModelsQuestionWizard.initI18N(0);
		
		}
	
	}
	
}