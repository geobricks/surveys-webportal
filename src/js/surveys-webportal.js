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
			
			$('#menu').bind('itemclick', function () {
				$("#container").load("surveys-manager.html", function() {
					SurveysManager.initUI();
				});
			}); 
			
		},
			
	}
	
}