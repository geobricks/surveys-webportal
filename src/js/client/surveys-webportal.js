if (!window.SurveysWebPortal) {
	
	window.SurveysWebPortal = {
		
		theme : "ui-start",
		
		showSurveysManager : function() {
			
			$("#menu").jqxMenu({
				width: '780', 
				showTopLevelArrows: true,
				autoOpen: true,
				enableHover: true,
				animationShowDuration: 300, 
				animationHideDuration: 200, 
				animationShowDelay: 200,
				theme: SurveysWebPortal.theme 
			});
			
			$('#menu').bind('itemclick', function (event) {
				var item = event.target.hash
				switch (item) {
					case "#home":
						document.getElementById('container').innerHTML = '';
					break;	
					case "#android":
						document.getElementById('container').innerHTML = '';
					break;
					case "#surveysManager":
						SurveysWebPortal.showSurveyModelsGrid();
					break;
					case "#statisticalEngine":
						document.getElementById('container').innerHTML = '';
					break;
					case "#login":
						document.getElementById('container').innerHTML = '';
					break;
				};
			}); 
			
		},
		
		showSurveyModelsGrid : function() {
			document.getElementById('container').innerHTML = '';
			$("#container").load("surveys-manager.html", function() {
				SurveysManager.initUI();
			});
		}
			
	}
	
}