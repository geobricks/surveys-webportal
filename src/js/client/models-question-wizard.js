if (!window.ModelsQuestionWizard) {
	
	window.ModelsQuestionWizard = {
			
		model : null,
		
		questionNumber : 1,
		
		multiple_choice_rendered : false,
		
		languages : [
	                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='../resources/images/ae.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>الْعَرَبيّة</span></div>", title: 'الْعَرَبيّة', value: 'ar' },
	                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='../resources/images/cn.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>中文</span></div>", title: '中文', value: 'cn' },
	                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='../resources/images/de.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>Deutsch</span></div>", title: 'Deutsch', value: 'de' },
	                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='../resources/images/gb.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>English</span></div>", title: 'English', value: 'en' },
	                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='../resources/images/fr.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>François</span></div>", title: 'François', value: 'fr' },
	                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='../resources/images/in.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>हिन्दी</span></div>", title: 'हिन्दी', value: 'in' },
	                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='../resources/images/es.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>Español</span></div>", title: 'Español', value: 'es' },
	                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='../resources/images/it.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>Italiano</span></div>", title: 'Italiano', value: 'it' },
	                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='../resources/images/jp.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>日本語</span></div>", title: '日本語', value: 'jp' },
	                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='../resources/images/pt.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>Português</span></div>", title: 'Português', value: 'pt' },
	                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='../resources/images/ru.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>русский</span></div>", title: 'русский', value: 'ru' }
	                ],
	                
	    questionHTML : '<tr><td colspan="3" style="font-family: sans-serif; font-size: 12px; color: #46A3CA; font-weight: bold; width: 60%;">Question</td></tr><tr id="questionRow"><td colspan="3"><textarea rows="5" cols="107" id="question"></textarea></td></tr>',
		
	    initUI : function(model, questionNumber) {
	    	
	    	ModelsQuestionWizard.model = model;
	    	ModelsQuestionWizard.questionNumber = questionNumber;
	    	
	    	$('#questionArea').load('single-question.html', function() {
	    		ModelsQuestionWizard.initElements();
	    		ModelsQuestionWizard.initSuggestions();
	    	});
	    	
	    },
	    
	    initSuggestions : function() {
	    	$('#info_question').click(function() {
	    		ModelsWebPortal.openWindow($.i18n.prop('info'), $.i18n.prop('info_question'));
			});
	    	$('#info_description').click(function() {
	    		ModelsWebPortal.openWindow($.i18n.prop('info'), $.i18n.prop('info_description'));
			});
	    	$('#info_indicator').click(function() {
	    		ModelsWebPortal.openWindow($.i18n.prop('info'), $.i18n.prop('info_indicator'));
			});
	    },
	    
	    initMultipleChoice : function() {
	    	
	    	var data = new Array();
	    	
	    	var row = {};
	    	row.ar_choice_label = 'ملصق';
	    	row.cn_choice_label = '标签';
	    	row.de_choice_label = 'Etikett';
	    	row.es_choice_label = 'Etiqueta';
	    	row.en_choice_label = 'Label';
	    	row.fr_choice_label = '&Eacute;tiquette';
	    	row.it_choice_label = 'Etichetta';
	    	row.pt_choice_label = 'Etiqueta';
	    	row.in_choice_label = 'लेबल';
	    	row.ru_choice_label = 'этикетка';
	    	row.jp_choice_label = 'ラベル';
	    	row.choice_code = null;
	    	data[0] = row;
	    	
	    	var source = {
				localdata: data,
	            datatype: "array"
	        };
				
	    	var dataAdapter = new $.jqx.dataAdapter(source);
	    	
	    	$('#grid_multiple_choice').jqxGrid({
            	width: 768,
                height: 150,
                source: dataAdapter,
                editable: true,
                columnsresize: true,
                showheader: true,
                sortable: true,
                enablehover: true,
                columns: [
                   {text: 'Choice Code', datafield: 'choice_code'},
                   {text: 'ملصق', datafield: 'ar_choice_label', width: 70},
                   {text: '标签', datafield: 'cn_choice_label', width: 70},
                   {text: 'Etikett', datafield: 'de_choice_label', width: 70},
                   {text: 'Etiqueta', datafield: 'es_choice_label', width: 70},
                   {text: 'Label', datafield: 'en_choice_label', width: 70},
                   {text: '&Eacute;tiquette', datafield: 'fr_choice_label', width: 70},
                   {text: 'लेबल', datafield: 'in_choice_label', width: 70},
                   {text: 'Etichetta', datafield: 'it_choice_label', width: 70},
                   {text: 'ラベル', datafield: 'jp_choice_label', width: 70},
                   {text: 'Etiqueta', datafield: 'pt_choice_label', width: 70},
                   {text: 'этикетка', datafield: 'ru_choice_label', width: 70}
                ],
                theme: ModelsWebPortal.theme
            });
	    	
	    	$(".model-manager-button").jqxButton({ 
				width: '200', 
				theme: ModelsWebPortal.theme 
			});
	    	
	    	$('#buttonAddAnotherMultipleChoice').bind('click', function () {
	    		var row = {};
	    		row.ar_choice_label = 'ملصق';
		    	row.cn_choice_label = '标签';
		    	row.de_choice_label = 'Etikett';
		    	row.es_choice_label = 'Etiqueta';
		    	row.en_choice_label = 'Label';
		    	row.fr_choice_label = '&Eacute;tiquette';
		    	row.it_choice_label = 'Etichetta';
		    	row.pt_choice_label = 'Etiqueta';
		    	row.in_choice_label = 'लेबल';
		    	row.ru_choice_label = 'этикетка';
		    	row.jp_choice_label = 'ラベル';
		    	row.choice_code = null;
	    		$("#grid_multiple_choice").jqxGrid('addrow', null, row);
	    	});
	    	
	    	$('#buttonDeleteSelectedChoice').bind('click', function () {
	    		var selectedrowindex = $("#grid_multiple_choice").jqxGrid('getselectedrowindex');
                var rowscount = $("#grid_multiple_choice").jqxGrid('getdatainformation').rowscount;
                if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
                    var id = $("#grid_multiple_choice").jqxGrid('getrowid', selectedrowindex);
                    $("#grid_multiple_choice").jqxGrid('deleterow', id);
                }
	    	});
	    	
	    	BabelFish.translateButton('buttonAddAnotherMultipleChoice');
	    	BabelFish.translateButton('buttonDeleteSelectedChoice');
	    	BabelFish.translateHTML('multiple_choice');
	    	
	    },
	    
	    initI18N : function(count) {
			
	    	BabelFish.translateHTML('current_model');
			BabelFish.translateHTML('model_description');
			BabelFish.translateHTML('answer_type');
			
	    	BabelFish.translateButtonWithLabel('buttonDeleteTranslation_' + count, 'buttonDeleteTranslation');
			BabelFish.translateButtonWithLabel('buttonAddTranslation_' + count, 'buttonAddTranslation');
			BabelFish.translateHTMLWithLabel('question_label_' + count, 'question_label');
			BabelFish.translateHTMLWithLabel('question_description_' + count, 'question_description');
			BabelFish.translateHTMLWithLabel('question_indicator_' + count, 'question_indicator');
			
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
				height: '99px', 
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
	    	
	    	document.getElementById('currentModelName').innerHTML = ModelsQuestionWizard.model[ModelsWebPortal.lang + "_name"];
	    	document.getElementById('currentModelDescription').innerHTML = ModelsQuestionWizard.model[ModelsWebPortal.lang + "_abstract"];
			
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
	    		
				/**
				 * se salvo ogni volta che torno al sommario salvo delle domanded vuote...
				 */
//				ModelsQuestionWizard.saveQuestion(true);
	    		
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
			row['code'] = 'single_value_boolean';
			row['label'] = $.i18n.prop("type_boolean");
			answer_type_data[3] = row;
			row = {};
			row['code'] = 'single_value_number';
			row['label'] = $.i18n.prop("type_numeric_value");
			answer_type_data[4] = row;
			row = {};
			row['code'] = 'multiple_choice';
			row['label'] = $.i18n.prop("type_multiple_choice");
			answer_type_data[5] = row;
			
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
			
			$('#listAnswerTypes').bind('change', function (e) {
				switch (e.args.item.value) {
					case 'multiple_choice':
						$('#questionTable').last().after(MCB.build());
			    		ModelsQuestionWizard.initMultipleChoice();
			    		ModelsQuestionWizard.multiple_choice_rendered = true;
					break;
					default:
						if (ModelsQuestionWizard.multiple_choice_rendered) {
							$('#multiple_choice_row_1').remove();
							$('#multiple_choice_row_2').remove();
							$('#multiple_choice_row_3').remove();
							ModelsQuestionWizard.multiple_choice_rendered = false;
						}
					break;
				}
			});
			
			$(".listTranslateQuestion").jqxDropDownList({ 
				source: ModelsQuestionWizard.languages, 
				selectedIndex: 1, 
				width: '150px', 
				height: '99px', 
				theme: ModelsWebPortal.theme
			});
			
			$(".listTranslateQuestion").bind('change', function(e) {
				$("#questionRow").after(ModelsQuestionWizard.questionHTML);
			});
			
			// set language on the drop-down
			var defaultLanguage = '';
			defaultLanguage = ModelsQuestionWizard.model.model_default_language;
			switch(defaultLanguage) {
				case 'ar': $(".listTranslateQuestion").jqxDropDownList('selectIndex', 0 ); break;
				case 'cn': $(".listTranslateQuestion").jqxDropDownList('selectIndex', 1 ); break;
				case 'de': $(".listTranslateQuestion").jqxDropDownList('selectIndex', 2 ); break;
				case 'en': $(".listTranslateQuestion").jqxDropDownList('selectIndex', 3 ); break;
				case 'fr': $(".listTranslateQuestion").jqxDropDownList('selectIndex', 4 ); break;
				case 'es': $(".listTranslateQuestion").jqxDropDownList('selectIndex', 5 ); break;
				case 'in': $(".listTranslateQuestion").jqxDropDownList('selectIndex', 6 ); break;
				case 'it': $(".listTranslateQuestion").jqxDropDownList('selectIndex', 7 ); break;
				case 'jp': $(".listTranslateQuestion").jqxDropDownList('selectIndex', 8 ); break;
				case 'pt': $(".listTranslateQuestion").jqxDropDownList('selectIndex', 9 ); break;
				case 'ru': $(".listTranslateQuestion").jqxDropDownList('selectIndex', 10 ); break;
			};
			
			$("#buttonNextQuestion").bind('click', function() {
				ModelsQuestionWizard.saveQuestion();
			});
			
			ModelsQuestionWizard.initI18N(0);
		
		},
		
		saveQuestion : function() {
			
			var counter = 0;
			var payload = {};
			
			// iterate to get all the (possible) translations of the questions
			while ($('#question_' + counter).val() != null) {
				
				var questionText = $('#question_' + counter).val();
				var questionInfo = $('#info_' + counter).val();
				var questionIndicator = $('#indicator_' + counter).val();
				var questionLanguage = $("#listTranslateQuestion_" + counter).jqxDropDownList('getSelectedItem').value;
				var answerType = $("#listAnswerTypes").jqxDropDownList('getSelectedItem').value;
				var id = ModelsQuestionWizard.model._id;
				
				payload.model_id = id;
				payload.answer_type = answerType;
				payload.question_number = ModelsQuestionWizard.questionNumber;
				
				payload[questionLanguage + "_text"] = questionText; 
				payload[questionLanguage + "_info"] = questionInfo;
				payload[questionLanguage + "_indicator"] = questionIndicator;
				
				// collect multiple choices, if any...
				if (ModelsQuestionWizard.multiple_choice_rendered) {
					var choices = new Array();
					var rows = $('#grid_multiple_choice').jqxGrid('getrows');
					for (var i = 0 ; i < rows.length ; i++) {
						var choice = {};
						choice.choice_number = (1 + i);
						if (rows[i].choice_code != null && rows[i].choice_code.length > 0) {
							choice.choice_code = rows[i].choice_code;
						} else {
							choice.choice_code = rows[i][ModelsWebPortal.lang + "_choice_label"];
						}
						if (rows[i].ar_choice_label.length > 0)
							choice.ar_choice_label = rows[i].ar_choice_label;
						if (rows[i].cn_choice_label.length > 0)
							choice.cn_choice_label = rows[i].cn_choice_label;
						if (rows[i].de_choice_label.length > 0)
							choice.de_choice_label = rows[i].de_choice_label;
						if (rows[i].es_choice_label.length > 0)
							choice.es_choice_label = rows[i].es_choice_label;
						if (rows[i].en_choice_label.length > 0)
							choice.en_choice_label = rows[i].en_choice_label;
						if (rows[i].fr_choice_label.length > 0)
							choice.fr_choice_label = rows[i].fr_choice_label;
						if (rows[i].in_choice_label.length > 0)
							choice.in_choice_label = rows[i].in_choice_label;
						if (rows[i].it_choice_label.length > 0)
							choice.it_choice_label = rows[i].it_choice_label;
						if (rows[i].jp_choice_label.length > 0)
							choice.jp_choice_label = rows[i].jp_choice_label;
						if (rows[i].pt_choice_label.length > 0)
							choice.pt_choice_label = rows[i].pt_choice_label;
						if (rows[i].ru_choice_label.length > 0)
							choice.ru_choice_label = rows[i].ru_choice_label;
						choices[i] = choice;
					}
					payload.choices = choices;
				}
				
				counter++;
			
			}
			
			$.ajax({
				
				type: 'GET',
				url: 'http://localhost:3000/addQuestion/model?callback=?',
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
			
		}
	
	}
	
}