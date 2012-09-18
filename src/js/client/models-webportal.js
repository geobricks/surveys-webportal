if (!window.ModelsWebPortal) {
	
	window.ModelsWebPortal = {
		
		theme : "ui-start",
		
		language : "",
		
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
			ModelsWebPortal.showModelsManager();
			
			// based on the current URL, add links to the different languages pages
			ModelsWebPortal.linkLanguageIcons();
			ModelsWebPortal.linkDesktopMobileLinks();
			
			// translate contents
			BabelFish.init();
			ModelsWebPortal.initI18N();
			
			// set default language
			var lang = $.url().param('lang');
			if (lang != null) {
				ModelsWebPortal.lang = lang;
			} else {
				ModelsWebPortal.lang = 'en';
			}
			
			// init header
			ModelsWebPortal.initHeader();
						
		},
		
		initHeader : function() {
			
			/**
			 * Fetch settings from DB
			 */
			$.ajax({
				
				type: 'GET',
				url: 'http://localhost:3000/select/settings/?callback=?',
				dataType: 'jsonp',
				jsonp: 'callback',
				
				success : function(response) {
					
					var appurl = document.URL;
					
					/**
					 * Iterate over the result
					 */
					$.each(response.languages, function(k, v) {
						
						/**
						 * Add languages
						 */
						var checked;
						v == 'true' ? checked = true : checked = false;
						if (checked) {
							var icon = '../resources/images/' + k + '.png';
							if (k == 'ar')
								icon = '../resources/images/ae.png';
							if (k == 'en')
								icon = '../resources/images/gb.png';
							if (k == 'ind')
								icon = '../resources/images/in.png';
							var tr = "<td><a href='" + appurl + "?lang=" + k + "' id='icon_" + k + "'><img src='" + icon + "' title='" + $.i18n.prop(k) + "'/></a></td>";
							$('#header tr').last().append(tr);
						}
						
					});
					
				},
				
				error : function(err, b, c) {
					alert(err.status + ", " + b + ", " + c);
				}
			
        	});
			
		},
		
		initI18N : function() {
			BabelFish.translateHTML('main_title');
			BabelFish.translateHTML('menu_home');
			BabelFish.translateHTML('menu_android');
			BabelFish.translateHTML('menu_models_manager');
			BabelFish.translateHTML('menu_statistical_engine');
			BabelFish.translateHTML('menu_products');
			BabelFish.translateHTML('menu_contribute');
			BabelFish.translateHTML('menu_administration');
			BabelFish.translateHTML('menu_login');
			BabelFish.translateHTML('footer_desktop');
			BabelFish.translateHTML('footer_mobile');
			BabelFish.translateHTML('footer_follow_us');
			BabelFish.translateHTML('home_body_home');
			BabelFish.translateHTML('home_body_android');
			BabelFish.translateHTML('home_body_model_manager');
			BabelFish.translateHTML('home_body_statistical_engine');
			BabelFish.translateHTML('home_body_contribute');
			BabelFish.translateHTML('home_body_login');
			BabelFish.translateHTML('home_title');
			BabelFish.translateHTML('home_body');
			BabelFish.translateHTML('contribute_abstract');
			BabelFish.translateHTML('contribute_github');
			BabelFish.translateHTML('contribute_translate');
		},
		
		linkLanguageIcons : function() {
			var url = document.URL;
			var idx = url.indexOf('?');
			var languages = ['ar', 'de', 'es', 'en', 'fr', 'it', 'pt', 'cn', 'in', 'jp', 'ru'];
			if (idx > -1) 
				url = url.substring(0, idx);
			for (var i = 0 ; i < languages.length ; i++) 
				$('#icon_' + languages[i]).attr('href', url + '?lang=' + languages[i]);
		},
		
		linkDesktopMobileLinks : function() {
			var url = document.URL;
			var idx = url.indexOf('/');
			if (idx > -1) 
				url = url.substring(0, idx);
			$('#footer_desktop').attr('href', url + '/desktop/index.html');
			$('#footer_mobile').attr('href', url + '/mobile/index.html');
		},
		
		showModelsManager : function() {
			
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
				theme: ModelsWebPortal.theme 
			});
			
			$('#menu').bind('itemclick', function (event) {
				var item = event.target.hash
				switch (item) {
					case "#home":
						document.getElementById('container').innerHTML = '';
						$("#container").load("home.html", function() {
							ModelsWebPortal.init();
						});
					break;	
					case "#contribute":
						document.getElementById('container').innerHTML = '';
						$("#container").load("contribute.html", function() {
							ModelsWebPortal.initI18N();
						});
					break;
					case "#products":
						document.getElementById('container').innerHTML = '';
						$("#container").load("products.html", function() {
							Products.init();
						});
					break;
					case "#android":
						document.getElementById('container').innerHTML = '';
					break;
					case "#modelsManager":
						ModelsWebPortal.showModelModelsGrid();
					break;
					case "#statisticalEngine":
						document.getElementById('container').innerHTML = '';
					break;
					case "#administration":
						document.getElementById('container').innerHTML = '';
						$("#container").load("administration.html", function() {
							Admin.init();
						});
					break;
					case "#login":
						document.getElementById('container').innerHTML = '';
					break;
				};
			}); 
			
		},
		
		showModelModelsGrid : function() {
			document.getElementById('container').innerHTML = '';
			$("#container").load("models-manager.html", function() {
				ModelsManager.initUI();
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