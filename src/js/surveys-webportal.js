if (!window.SurveysWebPortal) {
	
	window.SurveysWebPortal = {
		
		theme : "energyblue",
		
		showSurveysManager : function() {
			
			$("#container").load("surveys-manager.html", function() {
				SurveysManager.initUI();
			});
			
		},
			
	}
	
}