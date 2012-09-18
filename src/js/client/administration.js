if (!window.Admin) {
	
	window.Admin = {
			
		languages : new Array(),
			
		init : function() {
			
			/**
			 * Fetch settings from DB
			 */
			$.ajax({
				
				type: 'GET',
				url: 'http://localhost:3000/select/settings/?callback=?',
				dataType: 'jsonp',
				jsonp: 'callback',
				
				success : function(response) {
					
					/**
					 * Iterate over the result
					 */
					$.each(response.languages, function(k, v) {
						
						/**
						 * Add languages
						 */
						var checked;
						v == 'true' ? checked = true : checked = false;
						var tr = "<tr><td width='100%'><div id='label_lang_" + k + "'>" + $.i18n.prop(k) + "</div></td><td><div id='lang_" + k + "'></div></td></tr>";
						$('#table-languages').last().append(tr);
						$('#lang_' + k).jqxSwitchButton({ 
							height: 27, 
							width: 100, 
							theme: ModelsWebPortal.theme, 
							checked: checked 
						});
						Admin.languages.push(k);
						
					});
					
				},
				
				error : function(err, b, c) {
					alert(err.status + ", " + b + ", " + c);
				}
			
        	});
			
			/**
			 * Initiate button
			 */
			$(".model-manager-button").jqxButton({ 
				width: '768', 
				theme: ModelsWebPortal.theme 
			});
			BabelFish.translateButton('buttonSaveLanguages');
			
			/**
			 * Bind button
			 */
			$(".model-manager-button").bind('click', function() {
				Admin.updateLanguages();
			});
			
		},
		
		updateLanguages : function() {
			
			var payload = {};
			var tmp = {};
			for (var i = 0 ; i < Admin.languages.length ; i++) {
				tmp[Admin.languages[i]] = $('#lang_' + Admin.languages[i]).jqxSwitchButton('checked');
			}
			payload["languages"] = tmp;
			
			$.ajax({
				
				type: 'GET',
				url: 'http://localhost:3000/insert/settings?callback=?',
				dataType: 'jsonp',
				jsonp: 'callback',
				data: payload,
				
				success : function(model) {
					
					/**
					 * Reload the UI with new settings
					 */
					document.getElementById('container').innerHTML = '';
					$("#container").load("administration.html", function() {
						Admin.init();
					});
					
				},
				
				error : function(err, b, c) {
					alert(err + ': ' + b + ' - ' + c);
				}
				
			});
			
		}
	
	};
	
}