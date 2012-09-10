if (!window.ModelsModelWizard) {
	
	window.ModelsModelWizard = {
		
		initUI : function() {
			
			var source = [
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
		                ];
			
			$("#listLanguages").jqxDropDownList({ 
				source: source, 
				selectedIndex: 3, 
				width: '768', 
				height: '25px', 
				theme: ModelsWebPortal.theme
			});
			
			$(".model-manager-button").jqxButton({ 
				width: '150', 
				theme: ModelsWebPortal.theme 
			});
			
			$("#buttonCancelNewModel").bind('click', function () {
				ModelsWebPortal.openWindow("Info", "Are you sure you want to quit?", function() {
					ModelsWebPortal.showModelModelsGrid();
				});
			});
			
			$("#buttonSaveNewModel").bind('click', function () {
				
				ModelsWebPortal.openWindow("Info", "Are you sure you want to create a new model?", function() {
					
					var title = $("#modelTitle").val();
					var description = $("#modelDescription").val();
					var defaultLanguage = ($("#listLanguages").jqxDropDownList('getSelectedItem')).value;
					var payload = {};
					payload[defaultLanguage + "_name"] = title;
					payload[defaultLanguage + "_abstract"] = description;
					payload["model_default_language"] = defaultLanguage;
					
					$.ajax({
						
						type: 'GET',
						url: 'http://localhost:3000/insert/model?callback=?',
						dataType: 'jsonp',
						jsonp: 'callback',
						data: payload,
						
						success : function(model) {
							$("#window").dialog("close");
							ModelsWebPortal.openWindow("Info", "New model has been successfully saved! Do you want to start adding questions?", function() {
								$("#window").dialog("close");
								document.getElementById('container').innerHTML = '';
								$("#container").load("models-question-wizard.html", function() {
									ModelsQuestionWizard.initUI(model, 1);
								});
							}, function() {
								$("#window").dialog("close");
								ModelsWebPortal.showModelModelsGrid();
							});
						},
						
						error : function(err, b, c) {
							alert(err + ': ' + b + ' - ' + c);
	    				}
						
					});
					
				});
				
            });
			
			ModelsModelWizard.initI18N();
		
		},
		
		initI18N : function() {
			BabelFish.translateHTML('model_name');
			BabelFish.translateHTML('abstract');
			BabelFish.translateHTML('default_language');
			BabelFish.translateButton('buttonSaveNewModel');
			BabelFish.translateButton('buttonCancelNewModel');
		}
	
	}
	
}