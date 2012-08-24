if (!window.SurveysWebPortal) {
	
	window.SurveysWebPortal = {
		
		theme : "ui-start",
		
		init : function() {
			
			$("#window").dialog({
				resizable: true,
				height:150,
				width: 300,
				modal: true,
				autoOpen: false,
				title: "Info",
				buttons: {
					OK: function() {
						$( this ).dialog( "close" );
					},
					Cancel: function() {
						$( this ).dialog( "close" );
					}
				}
			});
			
			// initiate the menu
			SurveysWebPortal.showSurveysManager();
			
			// based on the current URL, add links to the different languages pages
			SurveysWebPortal.linkLanguageIcons();
			
			// translate contents
			BabelFish.init();
						
		},
		
		linkLanguageIcons : function() {
			var url = document.URL;
			var idx = url.indexOf('?');
			var languages = ['es', 'en', 'fr', 'it', 'pt'];
			if (idx > -1) 
				url = url.substring(0, idx);
			for (var i = 0 ; i < languages.length ; i++) 
				$('#icon_' + languages[i]).attr('href', url + '?lang=' + languages[i]);
		},
		
		showSurveysManager : function() {
			
			$("#container").load("home.html", function() {
				
			});
			
			$("#menu").jqxMenu({
				width: '768', 
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
						$("#container").load("home.html", function() {
							
						});
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
		},
		
		openWindow : function(title, message, ok_function, cancel_function) {
			
			// show the window with the given title and text
			document.getElementById('window').innerHTML = message;
			$("#window").dialog("option" , "title", title);
			$("#window").dialog("open");
			
			// override the function on the 'OK' button
			if (ok_function != null) {
				var buttons = $("#window").dialog("option" , "buttons"); 
				buttons["OK"] = ok_function;
				$("#window").dialog("option" , "buttons", buttons);
			}
			
			// override the function on the 'Cancel' button
			if (cancel_function != null) {
				var buttons = $("#window").dialog("option" , "buttons"); 
				buttons["Cancel"] = cancel_function;
				$("#window").dialog("option" , "buttons", buttons);
			}
			
		}
			
	}
	
}