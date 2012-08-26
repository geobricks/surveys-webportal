if (!window.ModelsModelWizard) {
	
	window.ModelsModelWizard = {
		
		initUI : function() {
			
			document.getElementById('model_name').innerHTML = $.i18n.prop('model_name');
			document.getElementById('abstract').innerHTML = $.i18n.prop('abstract');
			document.getElementById('default_language').innerHTML = $.i18n.prop('default_language');
			
			var source = [
		                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='/resources/images/gb.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>English</span></div>", title: 'English', value: 'en' },
		                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='/resources/images/fr.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>François</span></div>", title: 'François', value: 'fr' },
		                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='/resources/images/es.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>Español</span></div>", title: 'Español', value: 'es' },
		                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='/resources/images/it.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>Italiano</span></div>", title: 'Italiano', value: 'it' },
		                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='/resources/images/pt.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>Português</span></div>", title: 'Português', value: 'pt' }
		                ];
			
			$("#listLanguages").jqxDropDownList({ 
				source: source, 
				selectedIndex: 0, 
				width: '768', 
				height: '25px', 
				theme: ModelsWebPortal.theme
			});
			
			$(".model-manager-button").jqxButton({ 
				width: '150', 
				theme: ModelsWebPortal.theme 
			});
			
			$("#buttonSaveNewModel").attr('value', $.i18n.prop("buttonSaveNewModel"));
			$("#buttonCancelNewModel").attr('value', $.i18n.prop("buttonCancelNewModel"));
			
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
					payload.title = title;
					payload.description = description;
					payload.defaultLanguage = defaultLanguage;
					
					$.ajax({
						
						type: 'GET',
						url: 'http://localhost:5000/insert/model?callback=?',
						dataType: 'jsonp',
						jsonp: 'callback',
						data: payload,
						
						success : function(model) {
							$("#window").dialog("close");
							ModelsWebPortal.openWindow("Info", "New model has been successfully saved! Do you want to start adding questions?", function() {
								$("#window").dialog("close");
								document.getElementById('container').innerHTML = '';
								$("#container").load("models-question-wizard.html", function() {
									ModelsQuestionWizard.initUI(model);
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
		
		}
	
	}
	
}