if (!window.SurveysSurveyWizard) {
	
	window.SurveysSurveyWizard = {
		
		initUI : function() {
			
			var source = [
		                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='/resources/images/gb.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>English</span></div>", title: 'English', value: 'en' },
		                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='/resources/images/fr.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>François</span></div>", title: 'François', value: 'fr' },
		                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='/resources/images/es.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>Español</span></div>", title: 'Español', value: 'es' },
		                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='/resources/images/it.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>Italiano</span></div>", title: 'Italiano', value: 'it' }
		                ];
			
			$("#listLanguages").jqxDropDownList({ 
				source: source, 
				selectedIndex: 0, 
				width: '770', 
				height: '25px', 
				theme: SurveysWebPortal.theme
			});
			
			$(".survey-manager-button").jqxButton({ 
				width: '150', 
				theme: SurveysWebPortal.theme 
			});
			
			$("#buttonSaveNewModel").bind('click', function () {
				
				var c = confirm("Are you sure you want to create a new survey model?");
				
				if (c == true) {
					
					var title = $("#modelTitle").val();
					var description = $("#modelDescription").val();
					var defaultLanguage = ($("#listLanguages").jqxDropDownList('getSelectedItem')).value;
					var url = "http://localhost:3000/insert/model/" + title + "/" + description + "/" + defaultLanguage + "?callback=?";
					
					$.ajax({
						
						type: 'GET',
						url: url,
						dataType: 'jsonp',
						jsonp: 'callback',
						
						success : function(response) {
							alert("New survey model has been saved: " + response);
							document.getElementById('container').innerHTML = '';
							$("#container").load("surveys-manager.html", function() {
								SurveysManager.initUI();
							});
						},
						
						error : function(err, b, c) {
							alert(err.status + ", " + b + ", " + c);
						}
						
					});
				}
				
            });
		
		}
	
	}
	
}