if (!window.SurveysQuestionWizard) {
	
	window.SurveysQuestionWizard = {
			
		model : null,
		
		answerTypes : ['Please Select...', 'Text', 'Numeric Value', 'Date', 'Multiple Choice'],
		
		languages : [
	                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='/resources/images/select.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>Please Select...</span></div>", title: 'Please Select...', value: null },
	                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='/resources/images/gb.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>English</span></div>", title: 'English', value: 'en' },
	                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='/resources/images/fr.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>François</span></div>", title: 'François', value: 'fr' },
	                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='/resources/images/es.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>Español</span></div>", title: 'Español', value: 'es' },
	                    { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='/resources/images/it.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>Italiano</span></div>", title: 'Italiano', value: 'it' }
	                ],
		
		initUI : function(model) {
			
			SurveysQuestionWizard.model = model;
			
			document.getElementById('currentModelName').innerHTML = model.title;
			document.getElementById('currentModelDescription').innerHTML = model.description;
			
			$(".survey-manager-button").jqxButton({ 
				width: '150', 
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
				selectedIndex: 0, 
				width: '150', 
				height: '25px', 
				theme: SurveysWebPortal.theme
			});
		
		}
	
	}
	
}